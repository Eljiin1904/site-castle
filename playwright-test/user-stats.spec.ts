import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { AccountPage, UserStatsSection } from '../utils/page-objects';

test.describe('User Stats Section Tests', () => {
  let helpers: TestHelpers;
  let accountPage: AccountPage;
  let userStatsSection: UserStatsSection;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    accountPage = new AccountPage(page);
    userStatsSection = new UserStatsSection(page);
    await helpers.login();
  });

  test('TC-006: User Stats Navigation and Display', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Verify section loads successfully
    await expect(userStatsSection.monthlyWagered).toBeVisible();
    
    // Verify current month wagered display
    const monthlyWagered = await userStatsSection.monthlyWagered.textContent();
    expect(monthlyWagered).toMatch(/\$\s*[\d,]+\.?\d*/); // Format: $ 0.00
    
    // Verify "NO DATA AVAILABLE" message when no stats exist
    const noDataMessage = page.locator('[data-testid="no-data-message"]');
    if (await noDataMessage.isVisible()) {
      await expect(noDataMessage).toContainText('NO DATA AVAILABLE');
    }
    
    // Verify game-specific stats sections are visible
    await expect(userStatsSection.diceStats).toBeVisible();
    await expect(userStatsSection.allStatsTable).toBeVisible();
    
    // Verify section headers
    await expect(page.locator('[data-testid="dice-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="all-stats-header"]')).toBeVisible();
  });

  test('TC-007: Game Statistics Display - DICE', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Verify DICE section is visible
    await expect(userStatsSection.diceStats).toBeVisible();
    
    // Verify "Most Popular Game" indicator
    await expect(page.locator('[data-testid="most-popular-indicator"]')).toBeVisible();
    await expect(page.locator('[data-testid="most-popular-indicator"]')).toContainText('Most Popular Game');
    
    // Verify Total Wagered amount
    const totalWagered = await page.locator('[data-testid="dice-total-wagered"]').textContent();
    expect(totalWagered).toMatch(/\$[\d,]+\.?\d*/); // Format: $1,478.00
    
    // Verify Deposits amount
    const deposits = await page.locator('[data-testid="dice-deposits"]').textContent();
    expect(deposits).toMatch(/\$[\d,]+\.?\d*/);
    
    // Verify Withdrawals amount
    const withdrawals = await page.locator('[data-testid="dice-withdrawals"]').textContent();
    expect(withdrawals).toMatch(/\$[\d,]+\.?\d*/);
    
    // Verify P&L amount
    const pnl = await page.locator('[data-testid="dice-pnl"]').textContent();
    expect(pnl).toMatch(/\$[\d,]+\.?\d*/);
    
    // Verify refresh/reload icon is functional
    await expect(userStatsSection.refreshButton).toBeVisible();
    await expect(userStatsSection.refreshButton).toBeEnabled();
  });

  test('TC-008: All Stats Section Display', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Verify ALL STATS section is visible
    await expect(userStatsSection.allStatsTable).toBeVisible();
    
    // Verify three columns are displayed
    await expect(page.locator('[data-testid="bets-column-header"]')).toContainText('BETS');
    await expect(page.locator('[data-testid="wagered-column-header"]')).toContainText('WAGERED');
    await expect(page.locator('[data-testid="economy-column-header"]')).toContainText('ECONOMY');
    
    // Verify all games are listed with their respective statistics
    const expectedGames = [
      { game: 'duel-game', bets: '0', wagered: '$0.00', economy: '$0.00' },
      { game: 'cases-battles', bets: '0', wagered: '$0.00', economy: '$0.00' },
      { game: 'crash', bets: '0', wagered: '$0.00', economy: '$0.00' },
      { game: 'dice', bets: '9', wagered: '$900.00', economy: '$0.00' },
      { game: 'limbo', bets: '0', wagered: '$0.00', economy: '$0.00' },
      { game: 'blackjack', bets: '0', wagered: '$0.00', economy: '$5,000.00' },
      { game: 'mines', bets: '7', wagered: '$70.00', economy: '$0.00' },
      { game: 'double', bets: '5', wagered: '$506.00', economy: '$0.00' },
      { game: 'cases', bets: '0', wagered: '$0.00', economy: '$0.00' }
    ];
    
    for (const gameData of expectedGames) {
      const gameRow = userStatsSection.allStatsTable.locator(`[data-testid="stats-row-${gameData.game}"]`);
      await expect(gameRow).toBeVisible();
      
      const stats = await userStatsSection.getGameStats(gameData.game);
      expect(stats.bets).toContain(gameData.bets);
      expect(stats.wagered).toContain(gameData.wagered);
      expect(stats.economy).toContain(gameData.economy);
    }
    
    // Verify total statistics
    const totalBets = await page.locator('[data-testid="total-bets"]').textContent();
    const totalWagered = await page.locator('[data-testid="total-wagered"]').textContent();
    
    expect(totalBets).toContain('21');
    expect(totalWagered).toContain('$1,476.00');
  });

  test('TC-009: Statistics Data Accuracy', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Capture initial statistics
    const initialStats = await userStatsSection.getGameStats('dice');
    const initialTotalBets = await page.locator('[data-testid="total-bets"]').textContent();
    const initialTotalWagered = await page.locator('[data-testid="total-wagered"]').textContent();
    
    // Mock a new game activity
    await page.route('**/api/stats/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          dice: {
            bets: 10,
            wagered: 1000.00,
            economy: 0.00
          },
          totals: {
            bets: 22,
            wagered: 1576.00
          }
        })
      });
    });
    
    // Refresh statistics
    await userStatsSection.refreshStats();
    
    // Verify statistics have updated
    const updatedStats = await userStatsSection.getGameStats('dice');
    expect(updatedStats.bets).not.toBe(initialStats.bets);
    expect(updatedStats.wagered).not.toBe(initialStats.wagered);
    
    // Verify total statistics are recalculated
    const updatedTotalBets = await page.locator('[data-testid="total-bets"]').textContent();
    const updatedTotalWagered = await page.locator('[data-testid="total-wagered"]').textContent();
    
    expect(updatedTotalBets).not.toBe(initialTotalBets);
    expect(updatedTotalWagered).not.toBe(initialTotalWagered);
    
    // Verify bet count increased appropriately
    expect(updatedStats.bets).toContain('10');
    expect(updatedStats.wagered).toContain('$1,000.00');
    
    // Verify total calculations
    expect(updatedTotalBets).toContain('22');
    expect(updatedTotalWagered).toContain('$1,576.00');
  });

  test('TC-043: Statistics Load Performance', async ({ page }) => {
    // Test with large data sets
    const largeDataSet: Record<string, { bets: number; wagered: number; economy: number }> = {};
    for (let i = 0; i < 1000; i++) {
      largeDataSet[`game-${i}`] = {
        bets: Math.floor(Math.random() * 100),
        wagered: Math.floor(Math.random() * 10000),
        economy: Math.floor(Math.random() * 5000)
      };
    }
    
    await page.route('**/api/stats/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(largeDataSet)
      });
    });
    
    // Measure load time
    const startTime = Date.now();
    await accountPage.navigateToSection('user-stats');
    await helpers.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    
    // Verify load time is reasonable
    expect(loadTime).toBeLessThan(5000); // 5 seconds max
    
    // Verify interface remains responsive
    await expect(userStatsSection.allStatsTable).toBeVisible();
    await expect(userStatsSection.refreshButton).toBeEnabled();
    
    // Test scrolling performance
    await helpers.scrollToElement('[data-testid="total-bets"]');
    
    // Verify pagination or lazy loading (if implemented)
    const visibleRows = await userStatsSection.allStatsTable.locator('tr').count();
    expect(visibleRows).toBeLessThan(100); // Should not render all 1000 rows at once
  });

  test('Stats Refresh Functionality', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Verify refresh button is visible and enabled
    await expect(userStatsSection.refreshButton).toBeVisible();
    await expect(userStatsSection.refreshButton).toBeEnabled();
    
    // Click refresh button
    await userStatsSection.refreshStats();
    
    // Verify loading state
    await expect(page.locator('[data-testid="loading-indicator"]')).toBeVisible();
    
    // Verify data reloads
    await expect(page.locator('[data-testid="loading-indicator"]')).not.toBeVisible();
    await expect(userStatsSection.allStatsTable).toBeVisible();
    
    // Verify refresh timestamp updates
    const refreshTime = await page.locator('[data-testid="last-refresh"]').textContent();
    expect(refreshTime).toMatch(/\d{2}:\d{2}:\d{2}/); // Time format
  });

  test('Stats Filtering and Sorting', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Test date range filtering (if available)
    const dateFilter = page.locator('[data-testid="date-filter"]');
    if (await dateFilter.isVisible()) {
      await dateFilter.click();
      await page.locator('[data-testid="filter-last-week"]').click();
      
      // Verify filtered results
      await expect(page.locator('[data-testid="filtered-results"]')).toBeVisible();
    }
    
    // Test game type filtering
    const gameFilter = page.locator('[data-testid="game-filter"]');
    if (await gameFilter.isVisible()) {
      await gameFilter.click();
      await page.locator('[data-testid="filter-dice"]').click();
      
      // Verify only dice stats are shown
      await expect(page.locator('[data-testid="stats-row-dice"]')).toBeVisible();
      await expect(page.locator('[data-testid="stats-row-blackjack"]')).not.toBeVisible();
    }
    
    // Test column sorting
    const wageredHeader = page.locator('[data-testid="wagered-column-header"]');
    await wageredHeader.click();
    
    // Verify sorting indicator
    await expect(wageredHeader.locator('[data-testid="sort-indicator"]')).toBeVisible();
    
    // Verify rows are sorted by wagered amount
    const firstRowWagered = await page.locator('[data-testid="stats-row"]:first-child [data-testid="wagered"]').textContent();
    const secondRowWagered = await page.locator('[data-testid="stats-row"]:nth-child(2) [data-testid="wagered"]').textContent();
    
    // Extract numeric values for comparison
    const firstAmount = parseFloat(firstRowWagered?.replace(/[$,]/g, '') || '0');
    const secondAmount = parseFloat(secondRowWagered?.replace(/[$,]/g, '') || '0');
    
    expect(firstAmount).toBeGreaterThanOrEqual(secondAmount);
  });

  test('Stats Data Export', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Check if export functionality exists
    const exportButton = page.locator('[data-testid="export-stats"]');
    if (await exportButton.isVisible()) {
      // Test CSV export
      const downloadPromise = page.waitForEvent('download');
      await exportButton.click();
      await page.locator('[data-testid="export-csv"]').click();
      
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/stats.*\.csv$/);
      
      // Test PDF export
      const downloadPromise2 = page.waitForEvent('download');
      await exportButton.click();
      await page.locator('[data-testid="export-pdf"]').click();
      
      const download2 = await downloadPromise2;
      expect(download2.suggestedFilename()).toMatch(/stats.*\.pdf$/);
    }
  });

  test('Stats Real-time Updates', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Capture initial stats
    const initialDiceStats = await userStatsSection.getGameStats('dice');
    
    // Mock real-time update via WebSocket or polling
    await page.route('**/api/stats/realtime', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          dice: {
            bets: parseInt(initialDiceStats.bets || '0') + 1,
            wagered: parseFloat((initialDiceStats.wagered || '$0').replace(/[$,]/g, '')) + 100,
            economy: 0.00
          }
        })
      });
    });
    
    // Simulate real-time update
    await page.evaluate(() => {
      // Trigger real-time update event
      window.dispatchEvent(new CustomEvent('statsUpdate'));
    });
    
    // Verify stats updated without page refresh
    await expect(page.locator('[data-testid="stats-row-dice"] [data-testid="bets"]'))
      .toContainText((parseInt(initialDiceStats.bets || '0') + 1).toString());
  });

  test('Stats Error Handling', async ({ page }) => {
    // Navigate to User Stats section
    await accountPage.navigateToSection('user-stats');
    
    // Mock API error
    await page.route('**/api/stats/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Stats service unavailable' })
      });
    });
    
    // Attempt to refresh stats
    await userStatsSection.refreshStats();
    
    // Verify error handling
    await expect(page.locator('[data-testid="stats-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="stats-error"]'))
      .toContainText('Unable to load statistics');
    
    // Verify retry button is available
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
    
    // Test retry functionality
    await page.unroute('**/api/stats/**');
    await page.locator('[data-testid="retry-button"]').click();
    
    // Verify stats load after retry
    await expect(userStatsSection.allStatsTable).toBeVisible();
  });
});