const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const CSS = `
  body {
    font-family: Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #000;
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
  }
  h1 { font-size: 18pt; margin-bottom: 2px; }
  h2 { font-size: 13pt; border-bottom: 1px solid #000; margin-top: 14px; margin-bottom: 4px; }
  h3 { font-size: 11pt; margin-bottom: 2px; margin-top: 8px; }
  p { margin: 3px 0; }
  ul { margin: 2px 0; padding-left: 18px; }
  li { margin-bottom: 2px; }
  strong { font-weight: bold; }
  a { color: #000; text-decoration: none; }
  h2 { page-break-after: avoid; }
  h3 { page-break-after: avoid; }
  .block { break-inside: avoid; }
`;

function wrapBlocks(html) {
  // Wrap each <p><strong>...</strong>...</p> followed by <ul> into a break-inside:avoid div
  return html.replace(/(<p><strong>[\s\S]*?<\/p>\s*<ul>[\s\S]*?<\/ul>)/g, '<div class="block">$1</div>');
}

async function generatePdf(mdFile, pdfFile) {
  const md = fs.readFileSync(mdFile, 'utf8');
  const body = wrapBlocks(marked(md));
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfFile,
    format: 'A4',
    printBackground: false,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
  });
  await browser.close();
  console.log(`Generated: ${pdfFile}`);
}

const name = process.argv[2] || 'cv_cb-centres_it-staff';
const mdFile = path.join(__dirname, `../public/${name}.md`);
const pdfFile = path.join(__dirname, `../public/${name}.pdf`);
generatePdf(mdFile, pdfFile).catch(console.error);
