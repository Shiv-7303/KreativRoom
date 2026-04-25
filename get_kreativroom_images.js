const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://kreativroom.com');

  const images = await page.evaluate(() => {
    return Array.from(document.images).map(img => img.src);
  });

  fs.writeFileSync('kreativroom_images.json', JSON.stringify(images, null, 2));

  await browser.close();
})();
