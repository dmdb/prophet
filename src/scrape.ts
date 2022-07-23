import { firefox } from 'playwright';
import prisma from './prisma';
import { setLock } from './lock';

const scrape = async () => {
  console.log('Doing scrape');
  setLock(true);
  let browser;

  try {
    browser = await firefox.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://horo.mail.ru/prediction/today');
    const textContents = await page
      .locator('.p-prediction__inner .article__text')
      .allTextContents();
    const text = textContents.join('').replace('\n', '');
    const date = new Date();

    await prisma.horoscope.create({
      data: {
        text,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      },
    });

    return text;
  } catch (e) {
    console.error('Failure during scrape');
    console.error(e);

    return null;
  } finally {
    setLock(false);
    if (browser) {
      await browser.close();
    }
  }
};

export default scrape;
