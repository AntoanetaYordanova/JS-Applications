const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

const mockData = {
  'd953e5fb-a585-4d6b-92d3-ee90697398a0': {
    author: 'J.K.Rowling',
    title: "Harry Potter and the Philosopher's Stone",
  },
  'd953e5fb-a585-4d6b-92d3-ee90697398a1': {
    author: 'Svetlin Nakov',
    title: 'C# Fundamentals',
  },
};

function json(data) {
    return {
        status : 200,
        headers : {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
}

describe('tests', function () {
  this.timeout(10000);

  before(async () => {
    browser = await chromium.launch();
    // browser = await chromium.launch({headless : false, slowMo : 2000});
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it('loads books', async () => {
    await page.route('**/jsonstore/collections/books*', (route) => {
        route.fulfill(json(mockData));
    });
    await page.goto('http://127.0.0.1:5501/index.html');
    await page.click('text=Load All Books');

    await page.waitForSelector('tbody tr');

    const rows = await page.$$eval('tr', (rows) =>
      rows.map((r) => r.textContent.trim())
    );

    expect(rows[1]).to.include('Harry Potter');
    expect(rows[1]).to.include('Rowling');
    expect(rows[2]).to.include('C# Fundamentals');
    expect(rows[2]).to.include('Nakov');
  });

  it('creats new book', async () => {
    await page.goto('http://127.0.0.1:5501/index.html');

    await page.fill('form#createForm >> input[name="title"]', 'Title');
    await page.fill('form#createForm >> input[name="author"]', 'Author');

    const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'POST'),
        page.click('form#createForm >> text=Submit')
    ]);

    const data = JSON.parse(request.postData());
    
    expect(data.title).to.equal('Title');
    expect(data.author).to.equal('Author');
  });

  it.only('edits book', async () => {
    await page.goto('http://127.0.0.1:5501/index.html');
    await page.click('text=Load All Books');

    await page.waitForSelector('tbody tr');

    const rows = await page.$$eval('tr', (rows) =>
      rows.map((r) => r.textContent.trim())
    );
    
    const [title, author] = rows[1].split('\n');

    await page.click('text=Edit');

    await page.waitForSelector('form#editForm');
    
    const titleFromInput = await page.inputValue('form > input');
    const authorFromInput = await page.inputValue('input[name="title"]');
   
    expect(titleFromInput).to.equal(title);
  });
});
