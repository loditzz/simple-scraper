const puppeteer = require("puppeteer");

const main = async () => {
	// define browser outside try/catch to correctly close it in case of error
	let browser;
	try {
		browser = await puppeteer.launch({
			headless: true, // change to false to *see* the browser
		});

		const page = await browser.newPage(); //start a new page

		await page.goto("https://pt.wikipedia.org/wiki/Raspagem_de_dados"); // go to wikipedia's page on data scraping

		await page.waitForSelector("#mw-content-text"); // wait until the text selector is loaded

		// use page.evaluate to simulate what you can do on browser's console
		const html = await page.evaluate(() =>{
			return document.querySelector("#mw-content-text").textContent.trim() // return the text from article
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
  
  