const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 4000 }
  });
  
  // Wait a moment for Next.js to start completely
  await new Promise(r => setTimeout(r, 2000));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Scroll down a bit to trigger any Framer Motion scroll animations
  await page.evaluate(() => {
     window.scrollBy(0, 500);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
     window.scrollBy(0, 1000);
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Create output dir
  if (!fs.existsSync('/home/jules/verification')) {
    fs.mkdirSync('/home/jules/verification');
  }
  
  await page.screenshot({ path: '/home/jules/verification/nextjs-kreativroom.png', fullPage: true });
  
  await browser.close();
  console.log("Screenshot taken.");
})();
