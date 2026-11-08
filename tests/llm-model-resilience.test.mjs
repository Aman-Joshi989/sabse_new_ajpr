import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('llm-client implements fallback model and 403 error resilience', () => {
  const filePath = path.resolve(process.cwd(), 'lib/agents/llm-client.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  assert.ok(content.includes("export const FALLBACK_MODEL = 'gpt-4o-mini'"), 'Missing FALLBACK_MODEL default');
  assert.ok(content.includes('isModelAccessError'), 'Missing isModelAccessError handler');
  assert.ok(content.includes('does not have access to model'), 'Missing does not have access to model check');
  assert.ok(content.includes('withStructuredOutput'), 'Missing withStructuredOutput resilience');
  assert.ok(content.includes('process.env.OPENAI_MODEL'), 'Missing OPENAI_MODEL environment variable check');
});

test('cron routes use resilient model configuration instead of hardcoded gpt-4o', () => {
  const postCron = fs.readFileSync(path.resolve(process.cwd(), 'app/api/cron/generate-post/route.ts'), 'utf8');
  assert.ok(!postCron.includes("model: openai('gpt-4o')"), 'generate-post still has hardcoded gpt-4o');
  assert.ok(postCron.includes("process.env.OPENAI_MODEL || 'gpt-4o-mini'"), 'generate-post missing resilient model selection');

  const aegisCron = fs.readFileSync(path.resolve(process.cwd(), 'app/api/cron/agent-aegis/route.ts'), 'utf8');
  assert.ok(!aegisCron.includes("model: openai('gpt-4o')"), 'agent-aegis still has hardcoded gpt-4o');
  assert.ok(aegisCron.includes("process.env.OPENAI_MODEL || 'gpt-4o-mini'"), 'agent-aegis missing resilient model selection');

  const nexusCron = fs.readFileSync(path.resolve(process.cwd(), 'app/api/cron/agent-nexus/route.ts'), 'utf8');
  assert.ok(!nexusCron.includes("model: openai('gpt-4o')"), 'agent-nexus still has hardcoded gpt-4o');
  assert.ok(nexusCron.includes("process.env.OPENAI_MODEL || 'gpt-4o-mini'"), 'agent-nexus missing resilient model selection');
});

test('outrank agent route is configured with high execution timeout for full generation', () => {
  const outrankRoute = fs.readFileSync(path.resolve(process.cwd(), 'app/api/agents/outrank-competitor/route.ts'), 'utf8');
  assert.ok(outrankRoute.includes('export const maxDuration = 300'), 'outrank route missing maxDuration');
  assert.ok(outrankRoute.includes('createOutrankCrew'), 'outrank route missing createOutrankCrew');
});
