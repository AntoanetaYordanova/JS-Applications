const {chromium} = require('playwright-chromium');
const {expect} = require('chai');
const exp = require('constants');

let browser, page;

describe('E2E test', async function () {
    this.timeout(5000);
    
    before(async() => {browser = await chromium.launch()});
    after(async () => { await browser.close()});
    beforeEach(async() => {page = await browser.newPage()});
    afterEach(async() => {await page.close()});

    it('initial load', async () => {

        await page.goto('http://localhost:5500');

        await page.waitForSelector('.accordion');

        const content = await page.textContent('#main');
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('ALGOL');
        expect(content).to.contains('Unix');
    });

    it('More button works', async () => {
        await page.goto('http://localhost:5500');
        await page.waitForSelector('.accordion');
        await page.click('text="More"');
        await page.waitForResponse(/articles\/details/i);
        await page.waitForSelector('.accordion p');
        const visible = await page.isVisible('.accordion p');
        const buttontext = await page.textContent('.accordion button');
        expect(buttontext).to.equals('Less');
        expect(visible).to.be.true;
    });

    it('Less button works', async () => {
        await page.goto('http://localhost:5500');
        await page.waitForSelector('.accordion');
        await page.click('text="More"');
        await page.waitForResponse(/articles\/details/i);
        await page.waitForSelector('.accordion p', {state : 'visible'});
        await page.click('text="Less"');
        const isvisible = await page.isVisible('.accordion p');
        const buttonText = await page.textContent('.accordion button');

        expect(buttonText).to.equals('More');
        expect(isvisible).to.be.false;
    });
});

