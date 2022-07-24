import { isLocked } from './lock';
import prisma from './prisma';
import scrape from './scrape';

const RETRY_LIMIT = 20;
const RETRY_INTERVAL = 2000;

const timeout = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), RETRY_INTERVAL);
  });

const getPrediction = async (attempt = 1): Promise<string | null> => {
  if (attempt > RETRY_LIMIT) {
    return null;
  }

  if (isLocked()) {
    await timeout();
    return getPrediction(attempt + 1);
  }

  const date = new Date();
  const prediction =
    (
      await prisma.horoscope.findFirst({
        select: { text: true },
        where: {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      })
    )?.text || (await scrape());

  return prediction;
};

export default getPrediction;
