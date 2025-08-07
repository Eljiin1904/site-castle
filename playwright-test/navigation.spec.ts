import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { AccountPage } from '../utils/page-objects';

test.describe('Navigation & Page Load Tests', () => {
  let helpers: TestHelpers;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    accountPage = new AccountPage(page);
    await helpers.login();
  });

  test('TC-001: Account Page Initial Load', async ({ page }) => {
    // Verify page loads completely with all main sections
    await expect(accountPage.accountHeader).toContainText('ACCOUNT');
    await expect(accountPage.navigationMenu).toBeVisible();
    await expect(accountPage.profileSection).toBeVisible();
    await expect(accountPage.balanceDisplay).toContainText('$');
    await expect(accountPage.walletButton).toBeVisible();

    // Verify navigation menu sections are present
    const navItems = [
      'Home', 'Referrals', 'Duel Game', 'Cases Battles', 'Original Games',
      'Games', 'Slots', 'Live Casino', 'Game Shows', 'VIP', 'Support', 'Blog'
    ];

    for (const item of navItems) {
      await expect(accountPage.navigationMenu.locator(`[data-testid="nav-${item.toLowerCase().replace(/\s+/g, '-')}"]`)).toBeVisible();
    }
  });

  test('TC-002: Left Navigation Menu Functionality', async ({ page }) => {
    const navItems = [
      'home', 'referrals', 'duel-game', 'cases-battles', 'original-games',
      'games', 'slots', 'live-casino', 'game-shows', 'vip', 'support', 'blog'
    ];

    for (const item of navItems) {
      await accountPage.navigateToSection(item);
      
      // Verify navigation occurred
      await expect(page.locator(`[data-testid="${item}-section"]`)).toBeVisible({ timeout: 10000 });
      
      // Verify URL changed (if applicable)
      if (item !== 'home') {
        await expect(page).toHaveURL(new RegExp(`.*${item}.*`));
      }
    }
  });

  test('TC-042: Page Load Performance', async ({ page }) => {
    await helpers.clearCacheAndReload();
    
    const loadTime = await helpers.measurePerformance();
    
    // Verify page loads within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Verify interactive elements are responsive
    await expect(accountPage.walletButton).toBeVisible();
    await expect(accountPage.navigationMenu).toBeVisible();
    
    // Test interaction responsiveness
    const startTime = Date.now();
    await accountPage.navigateToSection('user-stats');
    const interactionTime = Date.now() - startTime;
    
    expect(interactionTime).toBeLessThan(1000);
  });

  test('TC-046: Network Error Handling', async ({ page }) => {
    // Simulate network disconnection
    await helpers.simulateNetworkError();
    
    // Attempt to navigate
    await accountPage.navigateToSection('user-stats');
    
    // Verify error handling
    await expect(page.locator('[data-testid="network-error"]')).toBeVisible({ timeout: 10000 });
    
    // Restore network and verify recovery
    await helpers.restoreNetwork();
    await page.reload();
    await helpers.waitForPageLoad();
    
    await expect(accountPage.accountHeader).toBeVisible();
  });

  test('TC-047: Server Error Handling', async ({ page }) => {
    // Mock server error response
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    // Attempt to load a section that requires API call
    await accountPage.navigateToSection('user-stats');
    
    // Verify error handling
    await expect(page.locator('[data-testid="server-error"]')).toBeVisible({ timeout: 10000 });
    
    // Verify error message is user-friendly
    const errorMessage = await page.locator('[data-testid="error-message"]').textContent();
    expect(errorMessage).toContain('something went wrong');
  });

  test('TC-044: Session Management', async ({ page }) => {
    // Mock session timeout
    await page.route('**/api/session', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Session expired' })
      });
    });
    
    // Attempt to navigate
    await accountPage.navigateToSection('settings');
    
    // Verify redirect to login
    await expect(page).toHaveURL(/.*login.*/);
    
    // Verify session data is cleared
    const sessionData = await page.evaluate(() => localStorage.getItem('session'));
    expect(sessionData).toBeNull();
  });

  test.describe('Cross-browser Navigation Tests', () => {
    ['chromium', 'firefox', 'webkit'].forEach(browserName => {
      test(`Navigation functionality in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Skipping ${browserName} test`);
        
        // Test basic navigation
        await accountPage.navigateToSection('user-stats');
        await expect(accountPage.userStatsSection).toBeVisible();
        
        // Test back/forward navigation
        await page.goBack();
        await expect(accountPage.profileSection).toBeVisible();
        
        await page.goForward();
        await expect(accountPage.userStatsSection).toBeVisible();
      });
    });
  });

  test('TC-040: Mobile Responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify page layout adapts
    await expect(accountPage.accountHeader).toBeVisible();
    await expect(accountPage.navigationMenu).toBeVisible();
    
    // Test mobile navigation (may be different from desktop)
    const mobileNavToggle = page.locator('[data-testid="mobile-nav-toggle"]');
    if (await mobileNavToggle.isVisible()) {
      await mobileNavToggle.click();
      await expect(accountPage.navigationMenu).toBeVisible();
    }
    
    // Test touch interactions
    await page.tap('[data-testid="nav-user-stats"]');
    await expect(accountPage.userStatsSection).toBeVisible();
    
    // Verify text scaling
    const headerText = await accountPage.accountHeader.textContent();
    expect(headerText).toBeTruthy();
  });

  test('TC-041: Tablet Responsiveness', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Verify page layout adapts
    await expect(accountPage.accountHeader).toBeVisible();
    await expect(accountPage.navigationMenu).toBeVisible();
    
    // Test tablet-specific interactions
    await accountPage.navigateToSection('settings');
    await expect(accountPage.settingsSection).toBeVisible();
    
    // Verify interface elements scale appropriately
    const walletButton = await accountPage.walletButton.boundingBox();
    expect(walletButton?.width).toBeGreaterThan(100);
    expect(walletButton?.height).toBeGreaterThan(30);
  });

  test('TC-038: Language Selection', async ({ page }) => {
    const languageSelector = page.locator('[data-testid="language-selector"]');
    
    // Open language menu
    await languageSelector.click();
    await expect(page.locator('[data-testid="language-menu"]')).toBeVisible();
    
    // Select different language
    await page.locator('[data-testid="language-es"]').click();
    
    // Verify language change
    await expect(accountPage.accountHeader).toContainText('CUENTA');
    
    // Verify persistence across navigation
    await accountPage.navigateToSection('settings');
    await expect(page.locator('[data-testid="settings-header"]')).toContainText('CONFIGURACIÓN');
  });

  test('TC-039: User Avatar and Dropdown', async ({ page }) => {
    const userAvatar = page.locator('[data-testid="user-avatar"]');
    
    // Click avatar
    await userAvatar.click();
    await expect(page.locator('[data-testid="user-dropdown"]')).toBeVisible();
    
    // Verify dropdown options
    await expect(page.locator('[data-testid="dropdown-profile"]')).toBeVisible();
    await expect(page.locator('[data-testid="dropdown-settings"]')).toBeVisible();
    await expect(page.locator('[data-testid="dropdown-logout"]')).toBeVisible();
    
    // Test profile navigation
    await page.locator('[data-testid="dropdown-profile"]').click();
    await expect(accountPage.profileSection).toBeVisible();
    
    // Test settings navigation
    await userAvatar.click();
    await page.locator('[data-testid="dropdown-settings"]').click();
    await expect(accountPage.settingsSection).toBeVisible();
  });
});