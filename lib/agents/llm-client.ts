import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local if it exists, otherwise fallback to .env
const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.local')) 
  ? path.resolve(process.cwd(), '.env.local') 
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

/**
 * Shared OpenAI model instance for all agents.
 * Adjust the temperature and model name as needed for different agents.
 */
export const createLLM = (temperature = 0.7, modelName = "gpt-4o") => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in your .env file.");
  }
  
  return new ChatOpenAI({
    modelName,
    temperature,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
};
