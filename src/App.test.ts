const faker = require("faker");
const puppeteer = require("puppeteer");

describe("App", () => {
    let page, browser;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ""
        });

        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".App");
    });

    afterAll(() => {
        browser.close();
    });

    test("shows the correct header", async () => {
        const html = await page.$eval(".App-Header-title", e => e.innerHTML);
        expect(html).toBe("Weather");
    }, 16000);

    test("can search for a city", async () => {
        await page.type("input[name=city]", "New York");
        await page.click("button[type=submit]");
        await page.waitFor(500);
        const cityText = await page.evaluate(`pa.stage.getChildByName("location").getChildByName("city").text`);
        expect(cityText).toBe("New York");
    }, 16000);
});
