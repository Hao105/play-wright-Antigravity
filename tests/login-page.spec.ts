import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

/**
 * 測試案例：登入流程驗證
 * 邏輯說明：從環境變數讀取憑證，走訪登入頁面並進行驗證。
 */
test.describe('Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Retrieve credentials from environment variables as per instructions
    const email = process.env.STOREDEMO_EMAIL;
    const password = process.env.STOREDEMO_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing STOREDEMO_EMAIL or STOREDEMO_PASSWORD environment variables. Please set them in your terminal before running tests.');
    }

    await loginPage.goto();
    await loginPage.login(email, password);

    // Assertions: using soft assertions where multiple checks exist
    // 1. 驗證 URL 不再包含 login (代表已跳轉)
    await expect.soft(page).not.toHaveURL(/.*login/);
    
    // 2. 驗證 Logout 按鈕是否可見，確認登入狀態
    await expect.soft(page.getByText('Logout')).toBeVisible();
  });
});
