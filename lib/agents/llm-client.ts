import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local if it exists, otherwise fallback to .env
const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.local')) 
  ? path.resolve(process.cwd(), '.env.local') 
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

export const FALLBACK_MODEL = 'gpt-4o-mini';

export function isModelAccessError(err: any): boolean {
  const msg = String(err?.message || err?.error?.message || err || '');
  return (
    msg.includes('does not have access to model') ||
    msg.includes('403') ||
    msg.includes('model_not_found') ||
    msg.includes('permission_denied') ||
    (msg.includes('The model') && msg.includes('does not exist'))
  );
}

/**
 * Resolve model name with strict security against restricted project keys.
 * If gpt-4o is passed or set in environment variables, it is automatically
 * sanitized to gpt-4o-mini because project keys (proj_*) on tier 1 lack gpt-4o permissions.
 */
export function resolveSafeModel(requestedModel?: string): string {
  const candidate = (requestedModel || process.env.OPENAI_MODEL || FALLBACK_MODEL).trim();
  if (candidate === 'gpt-4o' || candidate === 'gpt-4' || candidate.startsWith('gpt-4o-2024')) {
    return FALLBACK_MODEL;
  }
  return candidate;
}

/**
 * Shared OpenAI model instance for all agents with automatic fallback resilience.
 * Defaults to 'gpt-4o-mini' to guarantee project-key (proj_*) compatibility,
 * while supporting explicit OPENAI_MODEL environment variable overrides and transparent runtime fallback.
 */
export const createLLM = (temperature = 0.7, requestedModel?: string) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in your .env file.");
  }

  const primaryModel = resolveSafeModel(requestedModel);

  const createInstance = (model: string) => new ChatOpenAI({
    model: model,
    modelName: model,
    temperature,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const primaryLLM = createInstance(primaryModel);

  // Wrap with proxy to provide seamless runtime fallback if a 403 or model access error occurs
  return new Proxy(primaryLLM, {
    get(target: any, prop: string | symbol, receiver: any) {
      if (prop === 'invoke') {
        return async (input: any, options?: any) => {
          try {
            return await target.invoke(input, options);
          } catch (err: any) {
            if (isModelAccessError(err) && primaryModel !== FALLBACK_MODEL) {
              console.warn(`[createLLM] Model '${primaryModel}' threw access error. Auto-falling back to '${FALLBACK_MODEL}'...`);
              const fallbackInstance = createInstance(FALLBACK_MODEL);
              return await fallbackInstance.invoke(input, options);
            }
            throw err;
          }
        };
      }

      if (prop === 'withStructuredOutput') {
        return (schema: any, config?: any) => {
          const structuredPrimary = target.withStructuredOutput(schema, config);
          return new Proxy(structuredPrimary, {
            get(sTarget: any, sProp: string | symbol, sReceiver: any) {
              if (sProp === 'invoke') {
                return async (input: any, options?: any) => {
                  try {
                    return await sTarget.invoke(input, options);
                  } catch (err: any) {
                    if (isModelAccessError(err) && primaryModel !== FALLBACK_MODEL) {
                      console.warn(`[createLLM] withStructuredOutput: Model '${primaryModel}' threw access error. Auto-falling back to '${FALLBACK_MODEL}'...`);
                      const fallbackInstance = createInstance(FALLBACK_MODEL);
                      const structuredFallback = fallbackInstance.withStructuredOutput(schema, config);
                      return await structuredFallback.invoke(input, options);
                    }
                    throw err;
                  }
                };
              }
              return Reflect.get(sTarget, sProp, sReceiver);
            }
          });
        };
      }

      return Reflect.get(target, prop, receiver);
    }
  });
};
