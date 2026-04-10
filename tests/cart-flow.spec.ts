import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '../pages/cart-page';

/**
 * 測試案例：購物車流程驗證
 * 邏輯說明：在產品清單頁面選購產品，進入購物車頁面並確認產品正確顯示。
 */
test.describe('Cart Flow', () => {
  const TARGET_PRODUCT = 'Rode NT1-A Condenser Mic';

  test('should add a product to cart and verify it in the cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1. 導航至產品頁面
    await productsPage.goto();

    // 2. 將指定產品加入購物車
    await productsPage.addProductToCart(TARGET_PRODUCT);

    // 3. 開啟購物車側欄並前往購物車頁面
    await productsPage.openCartDrawer();
    await productsPage.clickViewCart();

    // 4. 驗證購物車內容
    // 檢查 URL 是否正確跳轉
    await expect.soft(page).toHaveURL(/.*cart/);

    // 檢查產品名稱是否出現在購物車中
    await expect.soft(cartPage.productInCart(TARGET_PRODUCT)).toBeVisible();

    // 檢查訂單摘要是否顯示金額 (不為 $0)
    const total = await cartPage.getOrderTotal();
    expect.soft(total).not.toBe('$0');
  });
});
