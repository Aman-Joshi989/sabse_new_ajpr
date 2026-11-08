import test from 'node:test';
import assert from 'node:assert';

function cleanMarkdownFences(raw) {
  if (!raw) return '';
  let text = raw.trim();
  text = text.replace(/^```(?:markdown|md)?\s*\r?\n?/i, '');
  text = text.replace(/\r?\n?```\s*$/i, '');
  return text.trim();
}

test('cleanMarkdownFences strips ```markdown and ``` correctly', () => {
  const wrapped = "```markdown\n## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph\n```";
  const cleaned = cleanMarkdownFences(wrapped);
  assert.strictEqual(cleaned, "## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph");
});

test('cleanMarkdownFences preserves clean markdown without fences', () => {
  const clean = "## Normal Heading\n\nContent here";
  assert.strictEqual(cleanMarkdownFences(clean), clean);
});
