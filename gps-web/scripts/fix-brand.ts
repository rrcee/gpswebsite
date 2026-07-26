import fs from 'fs';
import path from 'path';

const dirsToSearch = ['src/components', 'src/app'];
const root = path.resolve(__dirname, '..');

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  content = content.replace(/brand-primary/g, 'primary');
  content = content.replace(/brand-secondary/g, 'muted-foreground');
  content = content.replace(/brand-accent/g, 'accent');
  
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
