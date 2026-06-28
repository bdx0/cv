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
`;

async function generatePdf(mdFile, pdfFile) {
  const md = fs.readFileSync(mdFile, 'utf8');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${marked(md)}</body></html>`;

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

const mdFile = path.join(__dirname, '../public/cv_cb-centres_it-staff.md');
const pdfFile = path.join(__dirname, '../public/cv_cb-centres_it-staff.pdf');
generatePdf(mdFile, pdfFile).catch(console.error);
