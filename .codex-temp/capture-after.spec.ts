import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.setTimeout(240000);

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
const outputDir = path.resolve('docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/CAPTURES_APRES');

const routes = ['dashboard','users','vehicles','templates','company','depots','planning','audit','onboarding','privacy'] as const;

test('capture apres correction', async ({ page }) => {
  fs.mkdirSync(outputDir, { recursive: true });
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outputDir, 'login.png'), fullPage: true });

  const credentials = [
    { email: 'admin@ambulance.local', password: 'admin123' },
    { email: 'admin@ambulance.local', password: 'user123' },
    { email: 'admin@ambulance.local', password: 'admin' },
  ];

  let loggedIn = false;

  for (const cred of credentials) {
    await page.locator('input[type="email"]').first().fill('');
    await page.locator('input[type="password"]').first().fill('');
    await page.locator('input[type="email"]').first().fill(cred.email);
    await page.locator('input[type="password"]').first().fill(cred.password);
    await Promise.all([
      page.getByRole('button', { name: /se connecter|connexion/i }).first().click(),
      page.waitForLoadState('networkidle'),
    ]);

    if (page.url().includes('/dashboard')) {
      loggedIn = true;
      break;
    }
  }

  expect(loggedIn).toBeTruthy();

  for (const route of routes) {
    await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, `${route}.png`), fullPage: true });
  }
});
