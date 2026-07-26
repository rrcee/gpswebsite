const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

// Directories to ignore
const IGNORE_DIRS = ['node_modules', '.git', '.memory', 'organized_assets', 'wp-json', '.github', 's'];
const ROOT_DIR = __dirname;
const OUT_DIR = ROOT_DIR;

// Data structures
const pages = [];
const images = [];
const documents = [];
const galleries = [];
const navigation = [];
const assets = [];
const downloads = [];
const events = [];
const site_structure = [];

function isHtml(filepath) {
    return filepath.endsWith('.html') || filepath.endsWith('.htm');
}

function scanDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (IGNORE_DIRS.includes(file)) continue;
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            scanDir(filepath, fileList);
        } else {
            fileList.push(filepath);
        }
    }
    return fileList;
}

function getUrl(filepath) {
    return filepath.replace(ROOT_DIR, '').replace(/\\/g, '/');
}

function determineYearAndEvent(imgSrc, pageUrl, alt) {
    let year = "Unknown";
    let event = "Misc";
    const str = `${imgSrc} ${pageUrl} ${alt}`.toLowerCase();
    
    // basic heuristics for year
    for (let y = 2010; y <= 2026; y++) {
        if (str.includes(y.toString())) year = y.toString();
    }
    
    if (str.includes('sports')) event = "Sports Day";
    else if (str.includes('annual')) event = "Annual Day";
    else if (str.includes('science')) event = "Science Fair";
    else if (str.includes('independence')) event = "Independence Day";
    else if (str.includes('onam')) event = "Onam";
    else if (str.includes('arts')) event = "Arts Festival";
    else if (str.includes('classroom') || str.includes('class')) event = "Classroom";
    else if (str.includes('faculty') || str.includes('staff')) event = "Faculty";
    else if (str.includes('campus') || str.includes('building')) event = "Campus";
    else if (str.includes('gallery')) event = "Gallery";
    
    return { year, event };
}

async function processHtmlFile(filepath) {
    const html = fs.readFileSync(filepath, 'utf-8');
    const $ = cheerio.load(html);
    const url = getUrl(filepath);
    const title = $('title').text().trim() || path.basename(filepath);
    
    const pageData = {
        filename: path.basename(filepath),
        filepath: filepath,
        url: url,
        title: title,
        breadcrumb: '', // heuristic
        parent_page: path.basename(path.dirname(filepath)),
        child_pages: [],
        headings: [],
        paragraphs: [],
        lists: [],
        tables: [],
        forms: [],
        scripts: [],
        stylesheets: [],
        external_links: [],
        internal_links: []
    };

    // Extract headings
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
        pageData.headings.push($(el).text().trim());
    });
    
    // Extract text
    $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text) pageData.paragraphs.push(text);
    });

    // Links
    $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        
        if (href.startsWith('http') && !href.includes('gps.ac.in')) {
            pageData.external_links.push(href);
        } else {
            pageData.internal_links.push(href);
            // Check if document
            if (href.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|zip)$/i)) {
                documents.push({
                    url: href,
                    page: url,
                    title: $(el).text().trim() || path.basename(href)
                });
            }
        }
    });

    // Images
    $('img').each((i, el) => {
        const src = $(el).attr('src');
        if (!src) return;
        let alt = $(el).attr('alt') || '';
        const { year, event } = determineYearAndEvent(src, url, alt);
        
        // try to determine image dimensions from attrs
        let width = $(el).attr('width') || "Unknown";
        let height = $(el).attr('height') || "Unknown";

        images.push({
            filename: path.basename(src),
            path: src,
            src: src,
            page: url,
            alt: alt,
            year: year,
            event: event,
            resolution: `${width}x${height}`
        });
    });

    // CSS/JS
    $('link[rel="stylesheet"]').each((i, el) => pageData.stylesheets.push($(el).attr('href')));
    $('script[src]').each((i, el) => pageData.scripts.push($(el).attr('src')));

    pages.push(pageData);
}

async function main() {
    console.log("Scanning directory...");
    const allFiles = scanDir(ROOT_DIR);
    console.log(`Found ${allFiles.length} files.`);
    
    const htmlFiles = allFiles.filter(f => isHtml(f));
    console.log(`Found ${htmlFiles.length} HTML files.`);

    for (const file of htmlFiles) {
        await processHtmlFile(file);
    }

    console.log(`Extracted ${pages.length} pages, ${images.length} images, ${documents.length} documents.`);

    // Write JSONs
    fs.writeJsonSync(path.join(OUT_DIR, 'pages.json'), pages, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'images.json'), images, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'IMAGE_DATABASE.json'), images, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'documents.json'), documents, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'navigation.json'), navigation, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'galleries.json'), galleries, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'assets.json'), assets, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'downloads.json'), downloads, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'events.json'), events, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'site_structure.json'), site_structure, { spaces: 2 });
    fs.writeJsonSync(path.join(OUT_DIR, 'components.json'), [], { spaces: 2 }); // placeholder

    // Generate MDs
    generateMarkdownReports();
}

function generateMarkdownReports() {
    // SITE_MAP.md
    let sitemapMd = '# SITE MAP\n\n';
    pages.forEach(p => {
        sitemapMd += `- [${p.title}](${p.url})\n`;
    });
    fs.writeFileSync(path.join(OUT_DIR, 'SITE_MAP.md'), sitemapMd);

    // PAGE_INDEX.md
    let pageIndexMd = '# PAGE INDEX\n\n';
    pages.forEach(p => {
        pageIndexMd += `## ${p.title}\n- URL: ${p.url}\n- Filename: ${p.filename}\n- Links: ${p.internal_links.length}\n- Images: ${images.filter(img => img.page === p.url).length}\n\n`;
    });
    fs.writeFileSync(path.join(OUT_DIR, 'PAGE_INDEX.md'), pageIndexMd);

    // NAVIGATION_TREE.md (Simplified)
    let navMd = '# NAVIGATION TREE\n\n(Generated from page folders)\n';
    fs.writeFileSync(path.join(OUT_DIR, 'NAVIGATION_TREE.md'), navMd);

    // IMAGE_CATALOG.md
    let imgMd = '# IMAGE CATALOG\n\n';
    images.forEach(img => {
        imgMd += `- **${img.filename}** (Used on: ${img.page}) - Year: ${img.year}, Event: ${img.event}\n`;
    });
    fs.writeFileSync(path.join(OUT_DIR, 'IMAGE_CATALOG.md'), imgMd);

    // DOCUMENT_CATALOG.md
    let docMd = '# DOCUMENT CATALOG\n\n';
    documents.forEach(doc => {
        docMd += `- **${doc.title}** ([Download](${doc.url})) - Found on: ${doc.page}\n`;
    });
    fs.writeFileSync(path.join(OUT_DIR, 'DOCUMENT_CATALOG.md'), docMd);

    // GALLERY_DATABASE.md
    let galMd = '# GALLERY DATABASE\n\nPending detailed extraction.';
    fs.writeFileSync(path.join(OUT_DIR, 'GALLERY_DATABASE.md'), galMd);

    console.log("Reports generated.");
}

main().catch(console.error);
