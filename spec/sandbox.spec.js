const { chromium } = require("playwright");
// eslint-disable-next-line no-unused-vars
const should = require("chai").should();

let page;
let browser;

describe("Sandbox", () => {
  before(async function fn() {
    this.timeout(20000);
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });

    const context = await browser.newContext();
    page = await context.newPage();

    await page
      .goto("https://e2e-boilerplate.github.io/sandbox/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on the sandbox", async () => {
    await page.waitForSelector("h1");

    const pageTitle = await page.title();
    const title = await page.$eval("h1", (el) => el.textContent);

    pageTitle.should.eql("Sandbox");
    title.should.eql("Sandbox");
  });
});
