const puppeteer = require("puppeteer");

const main = async () => {
	// define browser outside try/catch to correctly close it in case of error
	let browser;
	try {
		const textSelector = "#mw-content-text";
		
		browser = await puppeteer.launch({
			headless: true, // change to false to *see* the browser
		});

		const page = await browser.newPage(); //start a new page

		await page.goto("https://pt.wikipedia.org/wiki/Raspagem_de_dados"); // go to wikipedia's page on data scraping

		await page.waitForSelector(textSelector); // wait until the text selector is loaded

		// use page.evaluate to simulate what you can do on browser's console
		const pageText = await page.evaluate((selector) =>{
			return document.querySelector(selector).textContent.trim() // return the text from article
		}, textSelector)

		console.log({ pageText });

		await browser.close();
		return "All done"
	} catch (error) {
		console.log(error);

		if (browser) browser.close();
		return error;
	}
};
  
main();
  
  