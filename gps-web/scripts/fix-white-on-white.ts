import fs from 'fs';
import path from 'path';

const dirsToSearch = ['src/components', 'src/app'];
const root = path.resolve(__dirname, '..');

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  content = content.replace(/bg-white\/50/g, 'bg-card border-border');
  content = content.replace(/bg-gray-100/g, 'bg-muted');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      replaceInFile(p);
    }
  }
}

for (const dir of dirsToSearch) {
  walk(path.join(root, dir));
}
