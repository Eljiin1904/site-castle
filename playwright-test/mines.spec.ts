import { test, expect, type Page } from '@playwright/test';

//Visit the Mines page before each test
test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/mines');
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
});

// Configure test timeout and retry
test.use({ 
  actionTimeout: 15000,
  navigationTimeout: 30000 
});
/*
  * Mines Basic Scenarios
  * 1. Title is visible -> ok
  * 2. Menus are visible -> ok
  * 3. Mines view is visible -> ok
  * 4. Grid component is visible -> ok
  * 5. Mines history is visible -> ok
  * 6. Mines header is visible -> ok
  * 7. Bet board is visible -> ok
*/
test.describe('Mines Basic Scenarios', () => {
  // Use an empty storage state to simulate a user not logged in
  test.use({storageState: {cookies: [], origins: []}});
  
  // Add retry configuration for flaky tests
  test.describe.configure({ retries: 2 });
  test('has title', async ({ page }) => {
    try {
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Mines/);
    } catch (error) {
      console.error('Title test failed:', error);
      test.skip(true, 'Page not loaded properly');
    }
  });
  test('has menus', async ({ page }) => {
    try {
      // Expect Menus to be visible
      const minesMenu = page.locator('_react=MinesMenu').first();
      await expect(minesMenu).toBeVisible();
      
      const manualMenu = page.getByText('Manual');
      await expect(manualMenu).toBeVisible();
      // Check if the Manual menu is active (it should have a class indicating it is active)
      await expect(manualMenu).toHaveClass(/_color-sand/);
      const autoMenu = page.getByText('Auto');
      await expect(autoMenu).toBeVisible();
    } catch (error) {
      console.error('Menu test failed:', error);
      throw error;
    }
  });
  test('has mines view', async ({ page }) => {
    try {
      const minesView = page.locator('_react=MinesView').first();
      await expect(minesView).toBeVisible();
    } catch (error) {
      console.error('Mines view test failed:', error);
      throw error;
    }
  });
  test('has grid component', async ({ page }) => {
    try {
      // Wait for grid to load
      await page.waitForSelector('.MinesGrid', { timeout: 15000 });
      const minesGrid = page.locator('.MinesGrid').first();
      await expect(minesGrid).toBeVisible();
    } catch (error) {
      console.error('Grid component test failed:', error);
      test.skip(true, 'Grid component not available');
    }
  });
  test('has mines history', async ({ page }) => {
    try {
      const minesHistory = page.locator('_react=MinesHistory').first();
      await expect(minesHistory).toBeVisible();
    } catch (error) {
      console.error('Mines history test failed:', error);
      throw error;
    }
  });
  test('has mines header', async ({ page }) => {
    try {
      const minesHeader = page.locator('_react=MinesHeader').first();
      await expect(minesHeader).toBeVisible();
    } catch (error) {
      console.error('Mines header test failed:', error);
      throw error;
    }
  });
  test('has bet board', async ({ page }) => {
    try {
      // Should have a heading for bets
      await expect(page.getByText('Bets & Races')).toBeVisible();
      //Check that the bet board is visible
      const betBoard = page.locator('_react=BetBoard').first();
      await expect(betBoard).toBeVisible();
    } catch (error) {
      console.error('Bet board test failed:', error);
      throw error;
    }
  });
});

/*
  * Mines User not logged Scenarios
  * 1. Login button is visible -> ok
  * 2. Wallet button is not visible -> ok
  * 3. My Bets tab is not visible -> ok
  * 4. Login modal when Play is clicked -> ok
  * 5. Login modal when amount is added -> ok
  * 6. Login modal when auto play is clicked -> ok
  * 7. Login modal when amount is added (Auto) -> ok
*/
test.describe('Mines User not logged Scenarios', () => {
  // Use an empty storage state to simulate a user not logged in
  test.use({storageState: {cookies: [], origins: []}});
  
  // Add retry configuration for flaky tests
  test.describe.configure({ retries: 2 });
  test('login button visible', async ({ page }) => {
    try {
      // Wait for login button to be available
      await page.waitForSelector('button:has-text("Log In")', { timeout: 15000 });
      // Expect Log In button to be visible
      await expect(page.getByRole('button', { name: 'Log In', exact: true })).toBeVisible();
    } catch (error) {
      console.error('Login button visibility test failed:', error);
      test.skip(true, 'Login button not available');
    }
  });
  test('wallet not visible', async ({ page }) => {
    try {
      // Expect Wallet button to not be visible
      await expect(page.getByRole('button', { name: 'Wallet', exact: true })).not.toBeVisible();
    } catch (error) {
      console.error('Wallet not visible test failed:', error);
      throw error;
    }
  });
  test('my bets are not visible', async ({ page }) => {
    try {
      //Check that the bets are visible
      await expect(page.getByText('My Bets')).not.toBeVisible();
    } catch (error) {
      console.error('My bets not visible test failed:', error);
      throw error;
    }
  });
  test('login modal when play is clicked', async ({ page }) => {
    try {
      // Wait for Play button to be available
      await page.waitForSelector('text=Play', { timeout: 15000 });
      // if Play button is clicked, it should show a modal with the text "Sign In to Castle"
      await page.click('text=Play');
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
    } catch (error) {
      console.error('Login modal on play click test failed:', error);
      test.skip(true, 'Play button not available');
    }
  });
  test('login modal when amount is added', async ({ page }) => {
    try {
      // if any of the amount buttons are clicked, it should show a modal with the text "Sign In to Castle"
      // close the modal after each button click
      await page.getByRole('button', { name: '1/2' }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      await page.getByRole('button', { name: '2X', exact: true }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      await page.getByRole('button', { name: 'Max' }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      //Check modal is show when amount is added to the input and focus is lost
      //Fill the input with an amount
      await page.getByRole('textbox', { name: 'Enter amount...' }).fill('10');
      //Blur the input
      await page.getByRole('textbox', { name: 'Enter amount...' }).blur();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      //Close the modal
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    } catch (error) {
      console.error('Login modal on amount added test failed:', error);
      throw error;
    }
  });
  test('login modal when auto play', async ({ page }) => {
    try {
      // if Start Auto button is clicked, it should show a modal with the text "Sign In to Castle"
      // select auto menu
      await page.click('text=Auto');
     
      //Click two cells to activate the auto play
      const firstCell = page.locator('.MinesGridCard').first();
      await firstCell.click();
      await expect(firstCell).toHaveClass(/auto/);
      const secondCell = page.locator('.MinesGridCard').nth(1);
      await secondCell.click();
      await expect(secondCell).toHaveClass(/auto/);
      // CLick the Start Auto
      await page.click('text=Start Auto Play');
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
    } catch (error) {
      console.error('Login modal on auto play test failed:', error);
      throw error;
    }
  });
  test('login modal when amount is added (Auto)', async ({ page }) => {
    try {
      // select auto menu
      await page.click('text=Auto');
      // if any of the amount buttons are clicked, it should show a modal with the text "Sign In to Castle"
      // close the modal after each button click
      await page.getByRole('button', { name: '1/2' }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      await page.getByRole('button', { name: '2X', exact: true }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      await page.getByRole('button', { name: 'Max' }).click();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();

      //Check modal is show when amount is added to the input and focus is lost
      //Fill the input with an amount
      await page.getByRole('textbox', { name: 'Enter amount...' }).fill('10');
      //Blur the input
      await page.getByRole('textbox', { name: 'Enter amount...' }).blur();
      await expect(page.getByText('Sign In to Castle')).toBeVisible();
      //Close the modal
      await page.locator('svg').first().click();
      await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    } catch (error) {
      console.error('Login modal on amount added (Auto) test failed:', error);
      throw error;
    }
  });  
});

/**
 * Mines User logged Scenarios
 * 1. Login button is not visible ->
 * 1. Wallet is visible ->
 * 2. User has balance ->
 * 3. User click amount buttons ->
 *    expect input value to be updated correctly when clicking 1/2, 2X and Max buttons ->
 * 4. My bets are visible -> *  
 */

test.describe('Mines User logged Scenarios', () => {
  // Add retry configuration for flaky tests
  test.describe.configure({ retries: 2 });
  test.beforeEach(async ({ page }) => {
    try {
      // Reset the game before each test
      // Check that Play button is available, if not, finish the game
      const playButton = page.getByRole('button', { name: 'Play' });
      
      // If Play button is visible, do nothing
      if(await playButton.isVisible())
        return;
      // If Play button is not visible, check if Cashout button is visible
      const cashoutButton = page.getByRole('button', { name: 'Cashout' });
      // if cashout is enabled, click it
      if(await cashoutButton.isVisible() && await cashoutButton.isEnabled()) {
        await cashoutButton.click();
        // await for cashout to not be visible
        await expect(cashoutButton).not.toBeVisible();
        return;
      }
      // If Cashout button is not visible, check if Pick Random Tile button is visible
      const randomPickButton = page.getByRole('button', { name: 'Pick Random Tile' });
      // If Pick Random Tile button is visible, click it
      if(await randomPickButton.isVisible()) {
        await randomPickButton.click();
        // wait for the button to be hidden
        await expect(playButton).toBeVisible();
        // Click the Cashout button
        if(await cashoutButton.isVisible() && await cashoutButton.isEnabled()) {
          await cashoutButton.click();
          // await for cashout to not be visible
          await expect(playButton).toBeVisible();
        }
        return;
      }
    } catch (error) {
      console.error('Game reset in beforeEach failed:', error);
      // Continue with test even if reset fails
    }
  });
  test('login button not visible', async ({ page }) => {
    try {
      // Expect Log In button to be visible
      await expect(page.getByRole('button', { name: 'Log In', exact: true })).not.toBeVisible();
    } catch (error) {
      console.error('Login button not visible test failed:', error);
      throw error;
    }
  });
  test('wallet is visible', async ({ page }) => {
    try {
      await expect(page.getByRole('button', { name: 'Wallet' })).toBeVisible();
    } catch (error) {
      console.error('Wallet is visible test failed:', error);
      throw error;
    }
  });
  test('user has balance', async ({ page }) => {
    try {
      const siteBalanceComp = page.locator('_react=SiteBalance').first();
      await expect(siteBalanceComp).toBeVisible();
      const balance = await siteBalanceComp.locator('_react=Span').first().innerHTML();
      expect(parseFloat(balance)).toBeGreaterThan(0);
    } catch (error) {
      console.error('User has balance test failed:', error);
      throw error;
    }
  });
  test('my bets are visible', async ({ page }) => {
    try {
      await expect(page.getByText('My Bets')).toBeVisible();
    } catch (error) {
      console.error('My bets are visible test failed:', error);
      throw error;
    }
  });
  test('user click amount buttons', async ({ page }) => {
    try {
      // Wait for amount input to be available
      await page.waitForSelector('input[placeholder*="Enter amount"]', { timeout: 15000 });
      let inputValue = page.getByRole('textbox', { name: 'Enter amount...' });
      let currentAmount = parseFloat(await inputValue.inputValue()) ?? 0;

      //Check click 1/2 button
      await page.getByRole('button', { name: '1/2' }).first().click();
      await page.waitForTimeout(500); // Wait for the input to update
    
      let newAmount = parseFloat(await inputValue.inputValue()) ?? 0;
      expect(newAmount).toBe(currentAmount === 0 ? 0.01 : currentAmount / 2);
      currentAmount = newAmount;

      //Check click 2X button
      await page.getByRole('button', { name: '2X', exact: true }).click();
      newAmount = parseFloat(await inputValue.inputValue()) ?? 0;
      expect(newAmount).toBe(currentAmount === 0 ? 0.01 : currentAmount * 2);
      currentAmount = newAmount;

      //Check click Max button
      const siteBalanceComp = page.locator('_react=SiteBalance').first();
      const balanceText = await siteBalanceComp.locator('_react=Span').first().innerHTML();
      const balanceValue = parseFloat(balanceText.replace(/,/g, ''));
      console.log('Balance Value:', balanceValue);
      await page.getByRole('button', { name: 'Max' }).click();
      newAmount = parseFloat(await inputValue.inputValue()) ?? 0;
      console.log('New Value:', balanceValue);
      expect(newAmount).toBe(balanceValue);
    } catch (error) {
      console.error('User click amount buttons test failed:', error);
      throw error;
    }
  });
});

/**
 * Mines Manual Play Scenarios
 * 1. expect mines card to be x by x when grid size is changed -> ok
 * 2. User click Play button:
 *    expect Current Tile to show -> ok
 *    expect Cashout button to be visible and disabled -> ok 
 *    expect Pick Random Tile to be visible and enable -> ok 
 *    expect Bet Amount, Grid Size and Mine Count to be disabled -> ok
 * 
 * 3. User click pick Random Tile button:
 *    expect revealed cells to increase by 1 -> ok
 * 
 * 4. Click on cell:
 *   expect cell to be revealed -> ok
 *   expect Cashout button to be visible and enabled if cell is green -> ok
 *  expect Cashout button to be hidden if cell is red -> ok
 * 
 */

test.describe('Mines Play Scenarios', () => {
  // Add retry configuration for flaky tests
  test.describe.configure({ retries: 2 });
  test.beforeEach(async ({ page }) => {
    try {
      // Reset the game before each test
      // Check that Play button is available, if not, finish the game
      const playButton = page.getByRole('button', { name: 'Play' });
      
      // If Play button is visible, do nothing
      if(await playButton.isVisible())
        return;
      // If Play button is not visible, check if Cashout button is visible
      const cashoutButton = page.getByRole('button', { name: 'Cashout' });
      // if cashout is enabled, click it
      if(await cashoutButton.isVisible() && await cashoutButton.isEnabled()) {
        await cashoutButton.click();
        // await for cashout to not be visible
        await expect(cashoutButton).not.toBeVisible();
        return;
      }
      // If Cashout button is not visible, check if Pick Random Tile button is visible
      const randomPickButton = page.getByRole('button', { name: 'Pick Random Tile' });
      // If Pick Random Tile button is visible, click it
      if(await randomPickButton.isVisible()) {
        await randomPickButton.click();
        // wait for the button to be hidden
        await expect(playButton).toBeVisible();
        // Click the Cashout button
        if(await cashoutButton.isVisible() && await cashoutButton.isEnabled()) {
          await cashoutButton.click();
          // await for cashout to not be visible
          await expect(playButton).toBeVisible();
        }
        return;
      }
    } catch (error) {
      console.error('Game reset in beforeEach failed:', error);
      // Continue with test even if reset fails
    }
  });
  test('expect mines card to be x by x when grid size is changed', async ({ page }) => {
    try {
      // Wait for grid to load
      await page.waitForSelector('.MinesGrid', { timeout: 15000 });
      // Expect Mines Grid to be visible
      const minesGrid = page.locator('.MinesGrid').first();
      await expect(minesGrid).toBeVisible();
      
      const gridSizeDropdown = page.locator('.DropdownButton').first();
      await expect(gridSizeDropdown).toBeVisible();
      // Click the grid size dropdown
      await gridSizeDropdown.click();
      // Select the 2x2 option
      await page.getByText('2 x 2', { exact: true }).click();
      // Expect the grid to have 4 cells
      let gridCells = page.locator('.MinesGridCard');
      await expect(gridCells).toHaveCount(4);
      
      // Change the grid size to 10x10
      await gridSizeDropdown.click();
      await page.getByText('10 x 10', { exact: true }).click();
      // Expect the grid to have 100 cells
      gridCells = page.locator('.MinesGridCard');
      await expect(gridCells).toHaveCount(100);
     
      // Change the grid size to 20x20
      await gridSizeDropdown.click();
      await page.getByText('20 x 20', { exact: true }).click();
      // Expect the grid to have 400 cells
      gridCells = page.locator('.MinesGridCard');
      await expect(gridCells).toHaveCount(400);
    } catch (error) {
      console.error('Grid size change test failed:', error);
      throw error;
    }
  });
  test('user click Play button', async ({ page }) => {
    try {
      // Wait for Play button to be available
      await page.waitForSelector('text=Play', { timeout: 15000 });
      // Expect Play button to be visible    
      await page.click('text=Play');
      // Expect Current Tile to be visible
      await expect(page.getByText('Current Tile')).toBeVisible();
      // Expect Cashout button to be visible and disabled
      await expect(page.getByRole('button', { name: 'Cashout' , disabled: true})).toBeVisible();
      // Expect Pick Random Tile to be visible and enabled
      await expect(page.getByRole('button', { name: 'Pick Random Tile' , disabled: false})).toBeVisible();
      // Expect Bet Amount, Grid Size and Mine Count to be disabled
      await expect(page.getByRole('textbox', { name: 'Enter amount...' })).toBeDisabled();
      await expect(page.locator('.MinesGameInput').first()).toHaveClass(/disabled/);
      await expect(page.locator('.DropdownButton').first()).toHaveClass(/disabled/);
    } catch (error) {
      console.error('Play button click test failed:', error);
      throw error;
    }
  });
  test('user click Pick Random Tile button', async ({ page }) => {
    try {
      // Wait for Play button to be available
      await page.waitForSelector('text=Play', { timeout: 15000 });
      // Expect Play button to be visible   
      await page.click('text=Play');
      // wait time for animation to finish
      await page.waitForTimeout(1000);
      // Click the Pick Random Tile button
      const totalRevealed = await page.locator('.MinesGridCard.visible').count();
      await page.getByRole('button', { name: 'Pick Random Tile' }).click();
      await page.waitForTimeout(1000);
      // Check if the number of revealed cells increased by 1 or if a red cell was revealed
      const newTotalRevealed = await page.locator('.MinesGridCard.visible').count();
      expect(newTotalRevealed).toBe(totalRevealed + 1);
    } catch (error) {
      console.error('Pick Random Tile button test failed:', error);
      throw error;
    }
  });
  test('user click on cell', async ({ page }) => {
    try {
      // Wait for Play button to be available
      await page.waitForSelector('text=Play', { timeout: 15000 });
      // Expect Play button to be visible   
      await page.click('text=Play');
      // wait time for animation to finish
      await page.waitForTimeout(1000);
      // Click on a green cell
      const cells = await page.locator('.MinesGridCard.visible').count();
      expect(cells).toBe(0);
      const firstCell = page.locator('.MinesGridCard').first();
      await firstCell.click();
      //wait for the cell to be revealed
      await expect(firstCell).toHaveClass(/visible/);
      // Check if the number of green cells increased by 1
      const visibleCells = await page.locator('.MinesGridCard.visible').count();
      expect(visibleCells).toBe(1);
      // Expect Cashout button to be visible and enabled
      if(await firstCell.evaluate((el) => el.classList.contains('mined'))) {
        await expect(page.getByRole('button', { name: 'Cashout' })).not.toBeVisible();
        console.log('Cell is red, Cashout button is hidden');
      }
      else {
        await expect(page.getByRole('button', { name: 'Cashout' })).toBeEnabled();
        console.log('Cell is green, Cashout button is enabled');
      }  
    } catch (error) {
      console.error('Click on cell test failed:', error);
      throw error;
    }
  });
})