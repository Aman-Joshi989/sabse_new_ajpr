import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

function getFiles(dir: string, exts = ['.tsx', '.jsx']): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === 'node_modules' || file === '.next' || file === '.git' || file === '.agent') continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath, exts));
      } else if (exts.some(ext => file.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

test('buttonVariants in components/ui/button.tsx does not use fragile hover:text-accent-foreground', () => {
  const buttonPath = path.resolve(process.cwd(), 'components/ui/button.tsx');
  const content = fs.readFileSync(buttonPath, 'utf8');

  // Must not have hover:text-accent-foreground which causes disappearing text on dark/light inverts
  assert.equal(content.includes('hover:text-accent-foreground'), false, 'Fragile hover:text-accent-foreground detected in button.tsx');
  assert.ok(content.includes('hover:text-slate-900 dark:hover:text-white'), 'Explicit high contrast hover text missing in outline variant');
});

test('No buttons or main CTA links point to dead hashes or empty hrefs', () => {
  const files = [...getFiles('app'), ...getFiles('components')];
  const deadHrefs: string[] = [];

  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('href="#"') || line.includes("href='#'") || line.includes('href=""') || line.includes("href=''") || line.includes('javascript:void(0)')) {
        deadHrefs.push(`${file}:${i + 1}: ${line.trim()}`);
      }
    }
  }

  assert.equal(deadHrefs.length, 0, `Found dead button links: ${deadHrefs.join(', ')}`);
});

test('ModeToggle component cleanly switches between light and dark without disappearing icons', () => {
  const togglePath = path.resolve(process.cwd(), 'components/mode-toggle.tsx');
  const content = fs.readFileSync(togglePath, 'utf8');

  assert.ok(content.includes('resolvedTheme'), 'ModeToggle must use resolvedTheme for instant state resolution');
  assert.ok(content.includes('aria-label'), 'ModeToggle must have aria-label for accessibility');
  assert.ok(content.includes('Sun'), 'ModeToggle must render Sun icon in dark mode');
  assert.ok(content.includes('Moon'), 'ModeToggle must render Moon icon in light mode');
});
