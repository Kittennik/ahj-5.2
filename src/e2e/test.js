import puppetteer from 'puppeteer';

const { fork } = require('child_process');

jest.setTimeout(30000);
describe('Форма', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test('Всплывающее окно', async () => {
    await page.goto(baseUrl);
    const button = await page.$('#add');
    button.click();
    await page.waitForSelector('#popup');
    const nameInput = await page.$eval('#productPrice', e => e.name);
    expect(nameInput).toBe('productPrice');
  });

  test('Добавление продукта', async () => {
    await page.type("input[name=productName]", 'Бабушкафон');
    await page.type("input[name=productPrice]", '100');
    const button = await page.$('.save');
    await button.click();
  });
});
