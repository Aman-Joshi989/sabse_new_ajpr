const puppeteer = require('puppeteer');

/**
 * BROWSER CONTROL DEMO
 * 
 * This script demonstrates how an AI or a developer can control a real web browser.
 * It will:
 * 1. Launch a visible browser window.
 * 2. Navigate to your website (assuming it's running on localhost:3000).
 * 3. Search for the "Services" menu and click it.
 * 4. Wait for a moment to show the dropdown.
 * 5. Take a screenshot of the result.
 */

async function runDemo() {
    console.log('🚀 Launching browser...');

    // Launch the browser. 'headless: false' makes it visible so you can watch!
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1280, height: 800 },
        slowMo: 100, // Slows down operations by 100ms so you can see what happens
    });

    try {
        const page = await browser.newPage();

        console.log('🌐 Navigating to your website...');
        // We try localhost first. If you're running the dev server, it will work.
        try {
            await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 5000 });
        } catch (err) {
            console.log('⚠️ Could not connect to localhost:3000. Trying the live site instead...');
            await page.goto('https://ajprworld.com', { waitUntil: 'networkidle2' });
        }

        console.log('🖱️ Hovering over "Services" menu...');
        // Find the Services link and hover over it to show the dropdown
        const servicesLink = await page.evaluateHandle(() => {
            const links = Array.from(document.querySelectorAll('nav a, div a'));
            return links.find(a => a.textContent.includes('Services'));
        });

        if (servicesLink && servicesLink.asElement()) {
            await servicesLink.asElement().hover();
            console.log('✅ Hovered over Services.');
        } else {
            console.log('⚠️ Could not find "Services" link, taking general screenshot.');
        }

        console.log('📸 Taking a screenshot...');
        await page.screenshot({ path: 'browser-demo-screenshot.png' });
        console.log('✅ Screenshot saved as browser-demo-screenshot.png');

        console.log('✨ Demo completed! Closing in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (error) {
        console.error('❌ An error occurred:', error.message);
    } finally {
        await browser.close();
        console.log('👋 Browser closed.');
    }
}

runDemo();
