import { chromium } from '@playwright/test';
import { Login } from '../pages/LoginPage';
import { ENV } from '../utils/env';

export default async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const login = new Login(page);
  await login.login(ENV.USER, ENV.PASSWORD,1);

  await page.waitForURL('**/pagina-inicial');
  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
};

