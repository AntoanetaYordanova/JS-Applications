const {chromium} = require ('playwright-chromium');
const {expect} = require ('chai');

let browser, page;

describe('tests', function() {
    this.timeout(10000);

    before(async() => {browser = await chromium.launch()});
    after(async() => {await browser.close()});
    beforeEach(async() => {page = await browser.newPage()});
    afterEach(async() => {await page.close()});

    it('load messages', async () => {
        await page.goto('http://127.0.0.1:5501/index.html');
        await page.click('#refresh');

        await page.waitForResponse(/jsonstore\/messenger/i) ;

        const content = await page.inputValue('#messages');

        expect(content).to.not.equal('');
    });

    it.only('post new message', async () => {
        await page.goto('http://127.0.0.1:5501/index.html');
        await page.fill('#author', 'Some author');
        await page.fill('#content', 'Some content');

        await page.click('#submit');
        let data;
        await page.route('**/jsonstore/messenger*', async(route, request) => {
            data = request.postData();
        })
        // const postData = JSON.parse(response.request().postData());

        expect(data).to.equal('');
    });
});
