import puppeteer from 'puppeteer';

/**
 * Creates a new browser instance.
 */
export function normal() {
  return puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    args: ['--start-maximized', '--disable-infobars'],
  });
}

/**
 * Creates a new browser instance without a UI.
 */
export async function headless() {
  return puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    args: ['--start-maximized', '--disable-infobars'],
  });
}

