const fs = require('fs');
const path = require('path');

const files = [
    'app/about/page.tsx',
    'app/portfolio/_components/PortfolioClient.tsx',
    'app/portfolio/_components/PortfolioCard.tsx'
];

// Replaces solid dark colors with light defaults + dark: variants
files.forEach(file => {
    let p = path.join(__dirname, '..', file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf-8');

        // General background fixes
        content = content.replace(/bg-\[\#030712\]/g, 'bg-slate-50 dark:bg-[#030712]');
        content = content.replace(/bg-\[\#0B0F19\]/g, 'bg-slate-50 dark:bg-[#0B0F19]');
        content = content.replace(/text-slate-50(?=\s|")/g, 'text-slate-900 dark:text-slate-50');

        // Text colors
        content = content.replace(/text-white(?=\s|")/g, 'text-slate-900 dark:text-white');
        content = content.replace(/text-slate-400(?=\s|")/g, 'text-slate-600 dark:text-slate-400');
        content = content.replace(/text-slate-300(?=\s|")/g, 'text-slate-700 dark:text-slate-300');

        // Backgrounds
        content = content.replace(/bg-slate-900\/20(?=\s|")/g, 'bg-slate-200/50 dark:bg-slate-900/20');
        content = content.replace(/bg-slate-900\/40(?=\s|")/g, 'bg-slate-200/80 dark:bg-slate-900/40');
        content = content.replace(/bg-slate-900\/50(?=\s|")/g, 'bg-slate-200 dark:bg-slate-900/50');
        content = content.replace(/bg-slate-900\/80(?=\s|")/g, 'bg-slate-200 dark:bg-slate-900/80');
        content = content.replace(/bg-slate-900(?=\s|")/g, 'bg-white dark:bg-slate-900');

        content = content.replace(/bg-slate-800\/20(?=\s|")/g, 'bg-white dark:bg-slate-800/20');
        content = content.replace(/bg-slate-800\/50(?=\s|")/g, 'bg-slate-100 dark:bg-slate-800/50');
        content = content.replace(/bg-slate-800(?=\s|")/g, 'bg-slate-50 dark:bg-slate-800');

        // Borders
        content = content.replace(/border-slate-800(?=\s|")/g, 'border-slate-200 dark:border-slate-800');
        content = content.replace(/border-slate-700(?=\s|")/g, 'border-slate-300 dark:border-slate-700');
        content = content.replace(/border-white\/10(?=\s|")/g, 'border-slate-300 dark:border-white/10');
        content = content.replace(/border-white\/20(?=\s|")/g, 'border-slate-300 dark:border-white/20');

        // Buttons: specific overrides if needed
        // Fix for "bg-[#0B0F19] hover:bg-black" -> "bg-slate-900 dark:bg-[#0B0F19]"
        content = content.replace(/bg-\[\#0B0F19\] hover:bg-black/g, 'bg-slate-900 hover:bg-slate-800 dark:bg-[#0B0F19] dark:hover:bg-black');

        // Fix the weird problem where some white text is intended to stay white regardless (like inside blue buttons)
        // If it starts with `text-slate-900 dark:text-white` but is inside a primary button, let's let it be white, or just leave it.
        // Let's replace 'text-slate-900 dark:text-white' back to 'text-white' if it's accompanied by 'bg-blue-600'
        content = content.replace(/bg-blue-600\s*(?:hover:[^\s]*\s*)*\s*(?:[^\s"]*\s*)*text-slate-900 dark:text-white/g, (match) => {
            return match.replace('text-slate-900 dark:text-white', 'text-white');
        });

        content = content.replace(/bg-purple-600\s*(?:hover:[^\s]*\s*)*\s*(?:[^\s"]*\s*)*text-slate-900 dark:text-white/g, (match) => {
            return match.replace('text-slate-900 dark:text-white', 'text-white');
        });

        // Grid dots pattern background correction
        content = content.replace(/bg-grid-slate-100/g, 'bg-grid-slate-900 dark:bg-grid-slate-100');

        fs.writeFileSync(p, content);
        console.log(`Processed ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
