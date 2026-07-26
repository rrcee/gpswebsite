const fs = require('fs-extra');
const path = require('path');

const OUT_DIR = __dirname;

function loadJson(filename) {
    try {
        return fs.readJsonSync(path.join(OUT_DIR, filename));
    } catch (e) {
        return [];
    }
}

const pages = loadJson('pages.json');
const images = loadJson('images.json');
const documents = loadJson('documents.json');

function generateQualityReview() {
    let md = '# CONTENT QUALITY REVIEW\n\n';
    
    md += '## Overview\n';
    md += `Total Pages: ${pages.length}\n`;
    md += `Total Images: ${images.length}\n`;
    md += `Total Documents: ${documents.length}\n\n`;

    md += '## Issues Found\n\n';
    pages.forEach(p => {
        let issues = [];
        if (p.title === '' || p.title === p.filename) issues.push('Missing/Poor Title');
        if (p.paragraphs.length === 0) issues.push('No Text Content');
        if (p.headings.length === 0) issues.push('No Headings (H1-H6)');
        if (p.external_links.length > 50) issues.push('Too Many External Links');
        
        let imgCount = images.filter(i => i.page === p.url).length;
        if (imgCount === 0 && p.paragraphs.length > 10) issues.push('Text-heavy but no images');
        
        if (issues.length > 0) {
            md += `### ${p.title || p.filename} (${p.url})\n`;
            issues.forEach(i => md += `- ${i}\n`);
            md += '\n';
        }
    });

    fs.writeFileSync(path.join(OUT_DIR, 'CONTENT_QUALITY_REVIEW.md'), md);
}

function generateNewSitemap() {
    let md = '# NEW SITEMAP & INFORMATION ARCHITECTURE\n\n';
    md += '## 1. Home\n';
    md += '  - Notice Board / Announcements\n';
    md += '  - News & Events\n';
    
    md += '## 2. About Us\n';
    md += '  - History\n';
    md += '  - Board of Directors\n';
    md += '  - School Managing Committee\n';
    md += '  - Faculty / Staff\n';
    md += '  - Mandatory Disclosure\n';
    
    md += '## 3. Academics\n';
    md += '  - Sections (Kindergarten, Primary, Secondary, Senior Secondary)\n';
    md += '  - Curriculum & Methodology\n';
    md += '  - Academic Session & Calendar\n';
    md += '  - School Results\n';
    md += '  - Book List / Library\n';
    
    md += '## 4. Admissions\n';
    md += '  - Fee Structure\n';
    md += '  - Eligibility & Guidelines\n';
    md += '  - Online Application / Registration\n';
    
    md += '## 5. Co-curricular & Facilities\n';
    md += '  - Clubs & Activities\n';
    md += '  - Sports & Games\n';
    md += '  - Laboratories\n';
    md += '  - Digital Classrooms\n';
    md += '  - Transportation\n';
    
    md += '## 6. Gallery & Media\n';
    md += '  - Image Gallery\n';
    md += '  - Video Gallery\n';
    md += '  - School Magazines & Newsletters\n';
    
    md += '## 7. Contact Us\n';
    md += '  - Location & Map\n';
    md += '  - Enquiry Form\n';
    md += '  - Career Opportunities\n';
    
    fs.writeFileSync(path.join(OUT_DIR, 'NEW_SITEMAP.md'), md);
}

function generatePageSpecs() {
    let md = '# PAGE SPECIFICATIONS\n\n';
    md += '> Specifications for the core pages to guide design and development.\n\n';

    md += '## Home Page\n';
    md += '- **Purpose:** Welcome visitors, highlight key achievements, provide quick access to admissions and notices.\n';
    md += '- **Target Audience:** Prospective parents, current parents, students.\n';
    md += '- **Required Components:** Hero Slider, Principal’s Message, Quick Links, Notice Board Widget, Gallery Teaser, Footer.\n';
    md += '- **SEO:** Title: Best School in Ernakulam | Global Public School; Desc: Discover world-class education...\n\n';

    md += '## About Us\n';
    md += '- **Purpose:** Establish trust and outline history.\n';
    md += '- **Target Audience:** Parents, Staff, Community.\n';
    md += '- **Required Components:** Timeline, Mission & Vision Cards, Leadership Profiles.\n\n';

    md += '## Admissions\n';
    md += '- **Purpose:** Convert prospective parents.\n';
    md += '- **Target Audience:** Parents seeking admission.\n';
    md += '- **Required Components:** Step-by-step accordion, Fee Table, CTA to Apply Now, Downloadable forms.\n\n';
    
    fs.writeFileSync(path.join(OUT_DIR, 'PAGE_SPECIFICATIONS.md'), md);
}

function generateComponentLibrary() {
    let md = '# COMPONENT LIBRARY\n\n';
    md += 'Identify reusable UI components across the new site design.\n\n';
    md += '## 1. Global Components\n';
    md += '- **Header / Mega Menu:** Sticky top navigation with multi-column dropdowns for Academics and Admissions.\n';
    md += '- **Footer:** Dark-themed footer containing all secondary links, social icons, and contact info.\n';
    md += '- **Breadcrumb:** Simple navigational trail at the top of interior pages.\n\n';
    
    md += '## 2. Card Components\n';
    md += '- **Notice Card:** Date, Title, Download PDF link. (Used on Home & Notice Board)\n';
    md += '- **Faculty Card:** Photo, Name, Subject/Role. (Used on Faculty page)\n';
    md += '- **Gallery Card:** Thumbnail image, Album Title, Photo count overlay.\n\n';
    
    md += '## 3. Informational Components\n';
    md += '- **Timeline:** Vertical timeline used for School History.\n';
    md += '- **Accordion / FAQ:** Collapsible sections for Fee Structure and rules.\n';
    md += '- **Data Table:** Used for Mandatory Disclosure and Staff details.\n';
    md += '- **Hero Banner:** Full-width image/video banner with title and CTA.\n\n';

    fs.writeFileSync(path.join(OUT_DIR, 'COMPONENT_LIBRARY.md'), md);
}

function generateMigrationPlan() {
    let md = '# CONTENT MIGRATION PLAN\n\n';
    md += 'Mapping of old URLs/structure to the new structure.\n\n';
    md += '| Old Page / Directory | New Page / Section | Action / Priority |\n';
    md += '| --- | --- | --- |\n';
    md += '| `index.html` | `/home` | Redesign & Merge |\n';
    md += '| `history-2/` | `/about-us/history` | Keep Content, Modernize |\n';
    md += '| `faculty/` | `/about-us/faculty` | Use Faculty Cards |\n';
    md += '| `fee-structure/` | `/admissions/fees` | Convert to Interactive Table |\n';
    md += '| `image-gallery/` | `/gallery` | Build Dynamic Gallery |\n';
    md += '| `contact-us/` | `/contact` | Add Map & Form |\n';
    
    md += '\n## Asset Migration\n';
    md += '- **Images:** All 1303 images have been cataloged. High-res images will be retained, low-res will be replaced.\n';
    md += '- **Documents:** 17 PDFs/Docs will be uploaded to a central CMS storage bucket and re-linked.\n';

    fs.writeFileSync(path.join(OUT_DIR, 'MIGRATION_PLAN.md'), md);
}

function generateMasterPRD() {
    let md = '# PRODUCT REQUIREMENTS DOCUMENT (MASTER PRD)\n\n';
    md += '## 1. Executive Summary\n';
    md += 'This document outlines the requirements for rebuilding the school website from scratch. The old site consists of over 120 pages and 1300+ images. The goal is to modernize the architecture, design, and content management.\n\n';
    
    md += '## 2. Goals\n';
    md += '- Modernize the UI/UX with premium design elements (glassmorphism, modern typography).\n';
    md += '- Improve Information Architecture (IA) to reduce clicks and confusion.\n';
    md += '- Ensure mobile responsiveness and accessibility (WCAG compliance).\n';
    md += '- Centralize asset management.\n\n';
    
    md += '## 3. Information Architecture & Navigation\n';
    md += 'Refer to `NEW_SITEMAP.md` and `NAVIGATION_TREE.md`.\n\n';
    
    md += '## 4. Design System\n';
    md += '- **Typography:** Modern fonts (Inter, Roboto, or Outfit).\n';
    md += '- **Colors:** School branding colors, with a cohesive dark mode option.\n';
    md += '- **Components:** Detailed in `COMPONENT_LIBRARY.md`.\n\n';
    
    md += '## 5. Development Roadmap\n';
    md += '- **Phase 1:** Setup Framework (Next.js/Vite) & Component System.\n';
    md += '- **Phase 2:** Build Core Pages (Home, About, Admissions).\n';
    md += '- **Phase 3:** Migrate Content (Refer to `MIGRATION_PLAN.md`).\n';
    md += '- **Phase 4:** Testing & SEO Optimization.\n';
    md += '- **Phase 5:** Deployment.\n\n';
    
    md += '## 6. Testing & Deployment Plan\n';
    md += 'Comprehensive automated testing for broken links. Vercel/Netlify for fast global CDN deployment.\n';

    fs.writeFileSync(path.join(OUT_DIR, 'MASTER_PRD.md'), md);
}

generateQualityReview();
generateNewSitemap();
generatePageSpecs();
generateComponentLibrary();
generateMigrationPlan();
generateMasterPRD();

console.log('Analyzer Phase Complete. Generated all strategic MD documents.');
