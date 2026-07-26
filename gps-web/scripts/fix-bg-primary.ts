import fs from 'fs';
import path from 'path';

const dirsToSearch = ['src/components', 'src/app'];
const root = path.resolve(__dirname, '..');

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // Fix page.tsx sections
  content = content.replace(/className="bg-primary border-t/g, 'className="bg-card border-t');
  content = content.replace(/className="bg-primary text-white"/g, 'className="bg-card text-foreground"');
  content = content.replace(/className="bg-primary rounded-3xl/g, 'className="bg-card rounded-3xl');
  
  // Fix hover states on buttons
  content = content.replace(/hover:bg-primary hover:text-white/g, 'hover:bg-primary hover:text-primary-foreground');
  
  // Fix Tabs
  content = content.replace(/data-\[state=active\]:text-white/g, 'data-[state=active]:text-primary-foreground');

  // Fix text-white to text-foreground globally if it might cause issues, 
  // but explicitly text-white is usually fine on dark backgrounds. 
  // Wait, in Quick Stats, we have `text-white` inside `bg-card`. `bg-card` is dark blue, `text-white` is white. So that's perfectly fine.
  
  // Let's also check for explicit `text-primary` where it expects a dark color.
  // Actually text-primary is now white, so on dark background it's fine.

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
