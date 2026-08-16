const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Pattern to find `return { title: ..., description: ... }` inside `generateMetadata`
  // This is a naive but effective regex for the common pattern in the codebase.
  const regex = /return\s*({\s*(?:alternates[^,]*,)?\s*title:\s*([^,]+),\s*description:\s*([^,]+)(?:,\s*keywords[^,]*)?\s*})/g;

  content = content.replace(regex, (match, innerObj, titleCode, descCode) => {
    // If it already has openGraph, skip
    if (match.includes('openGraph:')) {
        return match;
    }
    
    modified = true;
    
    // We recreate the return object with openGraph
    // We strip the trailing brace and append our OG
    let stripped = match.trim().slice(0, -1);
    
    return `${stripped},
        openGraph: {
            title: ${titleCode},
            description: ${descCode},
            type: 'website',
            siteName: 'AJPR World'
        }
    }`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated OG tags in ${path.relative(appDir, filePath)}`);
  }
}

const allFiles = getFiles(appDir);
allFiles.forEach(processFile);
console.log("Done updating dynamic page metadata.");
