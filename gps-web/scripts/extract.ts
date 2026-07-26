import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const ROOT_DIR = path.resolve(__dirname, '../../'); // C:\Users\imrca\Downloads\gps.ac.in
const DATA_DIR = path.resolve(__dirname, '../src/lib/data');

// Create data directory if not exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Member {
  name: string;
  role: string;
  qualification: string;
  imageUrl?: string;
}

function extractTeamMembers(filePath: string): Member[] {
  const members: Member[] = [];
  if (!fs.existsSync(filePath)) return members;
  
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  $('.et_pb_team_member').each((_, el) => {
    const name = $(el).find('h4.et_pb_module_header').text().trim();
    const role = $(el).find('.et_pb_member_position').text().trim();
    // Qualification or score is usually the <p> inside the direct <div> inside .et_pb_team_member_description
    const qualification = $(el).find('.et_pb_team_member_description > div > p').text().trim();
    
    // Sometimes the image is there, sometimes not
    let imageUrl = $(el).find('.et_pb_team_member_image img').attr('src');
    
    if (name) {
      members.push({ name, role, qualification, imageUrl });
    }
  });

  return members;
}

function extractGalleryImages(galleryDir: string): { title: string, cover: string, link: string, images: string[] }[] {
  const albums: { title: string, cover: string, link: string, images: string[] }[] = [];
  if (!fs.existsSync(galleryDir)) return albums;

  const mainHtml = fs.readFileSync(path.join(galleryDir, 'index.htm'), 'utf-8');
  const $ = cheerio.load(mainHtml);
  
  // Extract albums from main index.htm
  $('.aigpl-cnt-wrp').each((_, el) => {
    const $link = $(el).find('a.aigpl-img-link').first();
    const href = $link.attr('href'); // e.g., index-6.htm?album=...
    const cover = $link.find('img.aigpl-img').attr('src') || '';
    const title = $(el).find('.aigpl-img-title').text().trim();
    
    if (href && title) {
      // Find the corresponding local file for this album. 
      // It's likely just the filename part of the href before '?'
      const localFileName = href.split('?')[0]; 
      
      const images: string[] = [];
      const localFilePath = path.join(galleryDir, localFileName);
      if (fs.existsSync(localFilePath)) {
        const albumHtml = fs.readFileSync(localFilePath, 'utf-8');
        const $album = cheerio.load(albumHtml);
        
        $album('.aigpl-img-link').each((_, imgEl) => {
          const imgSrc = $album(imgEl).attr('data-mfp-src') || $album(imgEl).find('img').attr('src');
          if (imgSrc) {
            images.push(imgSrc);
          }
        });
      }
      
      albums.push({
        title,
        cover,
        link: href,
        images
      });
    }
  });

  return albums;
}

// 1. Extract Faculty
console.log('Extracting Faculty...');
const faculty = extractTeamMembers(path.join(ROOT_DIR, 'faculty/index.htm'));
fs.writeFileSync(path.join(DATA_DIR, 'faculty.ts'), `export const faculty = ${JSON.stringify(faculty, null, 2)};\n`);
console.log(`Extracted ${faculty.length} faculty members.`);

// 2. Extract Results
console.log('Extracting Results...');
const resultsDirs = ['school-results-2021', 'school-results-2022', 'school-results-2023', 'school-result2024', 'schoolresult2025'];
const allResults: Record<string, Member[]> = {};

resultsDirs.forEach(dir => {
  // Legacy paths may exist with different casings or dashes
  const possiblePaths = [dir, dir.replace('-', ''), dir.replace('results', 'result')];
  let found = false;
  for (const p of possiblePaths) {
    const fullPath = path.join(ROOT_DIR, `${p}/index.htm`);
    if (fs.existsSync(fullPath)) {
      const yearMatch = dir.match(/202\d/);
      if (yearMatch) {
        const year = yearMatch[0];
        const members = extractTeamMembers(fullPath);
        if (members.length > 0) {
          allResults[year] = members;
          console.log(`Extracted ${members.length} results for ${year}`);
        }
      }
      found = true;
      break;
    }
  }
});
fs.writeFileSync(path.join(DATA_DIR, 'results.ts'), `export const results = ${JSON.stringify(allResults, null, 2)};\n`);

// 3. Extract Gallery
console.log('Extracting Gallery...');
const gallery = extractGalleryImages(path.join(ROOT_DIR, 'image-gallery'));
fs.writeFileSync(path.join(DATA_DIR, 'gallery.ts'), `export const gallery = ${JSON.stringify(gallery, null, 2)};\n`);
console.log(`Extracted ${gallery.length} gallery albums.`);

// 4. Extract Governance & Policies
console.log('Extracting Governance...');
const governance: Record<string, Member[]> = {
  boardOfDirectors: extractTeamMembers(path.join(ROOT_DIR, 'board-of-directors/index.htm')),
  schoolManagingCommittee: extractTeamMembers(path.join(ROOT_DIR, 'school-managing-committee/index.htm'))
};
fs.writeFileSync(path.join(DATA_DIR, 'governance.ts'), `export const governance = ${JSON.stringify(governance, null, 2)};\n`);
console.log(`Extracted Governance data.`);

console.log('Data extraction complete!');
