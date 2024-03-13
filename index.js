const puppeteer = require("puppeteer");

const main = async () => {
	// define browser outside try/catch to correctly close it in case of error
	let browser;
	try {
		browser = await puppeteer.launch({
			headless: true, // change to false to *see* the browser
		});

		const page = await browser.newPage(); //start a new page

		await page.goto("https://www.wikipedia.org/"); // go to wikipedia's page

		await page.waitForSelector(".central-textlogo-wrapper"); // wait until the central text logo is fully loaded

		// use page.evaluate to simulate what you can do on browser's console
		const html = await page.evaluate(() =>{
			return document.querySelector(".central-textlogo-wrapper").textContent.trim(); // return the text from the central logo
		})

		console.log({ html });

		await browser.close();
		return "All done"
	} catch (error) {
		console.log(error);

		if (browser) browser.close();
		return error;
	}
};
  
main();
  
  