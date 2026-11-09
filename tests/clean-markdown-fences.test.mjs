import test from 'node:test';
import assert from 'node:assert';

function cleanMarkdownFences(raw) {
  if (!raw) return '';
  let text = raw.trim();
  while (/^```(?:markdown|md)?\s*\r?\n?/i.test(text)) {
    text = text.replace(/^```(?:markdown|md)?\s*\r?\n?/i, '').trim();
  }
  while (/\r?\n?```\s*$/i.test(text)) {
    text = text.replace(/\r?\n?```\s*$/i, '').trim();
  }
  return text;
}

test('cleanMarkdownFences strips ```markdown and ``` correctly', () => {
  const wrapped = "```markdown\n## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph\n```";
  const cleaned = cleanMarkdownFences(wrapped);
  assert.strictEqual(cleaned, "## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph");
});

test('cleanMarkdownFences strips nested or repeated markdown fences', () => {
  const doublyWrapped = "```markdown\n```\n## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph\n```\n```";
  const cleaned = cleanMarkdownFences(doublyWrapped);
  assert.strictEqual(cleaned, "## Why Custom Software Development?\n\n### 1. Tailored Solutions\nParagraph");
});

test('cleanMarkdownFences preserves clean markdown without fences', () => {
  const clean = "## Normal Heading\n\nContent here";
  assert.strictEqual(cleanMarkdownFences(clean), clean);
});

