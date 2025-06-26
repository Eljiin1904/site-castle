//Chat Component Playwrit Test
import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http:127.0.0.1:3000');
});

//Test before log in
// 1. Test if the chat button is not visible -> ok
// 2. Test if the chat button is not visible after logging out -> ok

//Test after log in
// 1. Test if the chat button is visible -> ok
// 2. Test if the chat button is click it, chat madal is open -> ok
// 3. Check number of connected users -> ok
// 4. Send a message & Check if the message is visible -> ok
// 5. Check if Earn button is click it, Earn modal is opened -> ok
// 6. Check if the tip button is click it, Tip modal is opened -> ok
// 7. Check if disabled button is not clickable -> ok

test.skip('Not user out Scenario', () => {

  test.use({storageState: {cookies: [], origins: []}});
  test('Chat button is not visible', async ({ page }) => {
    
    const chatButton = page.locator('_react=ChatToggle');
    await expect(chatButton).not.toBeVisible();
  });

  test('Chat button is not visible after logout', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Log In', exact: true  }).click();
    await page.getByRole('textbox', { name: 'Enter your username or email' }).click();
    await page.getByRole('textbox', { name: 'Enter your username or email' }).fill('josue');
    await page.getByRole('textbox', { name: 'Enter password...' }).fill('Pidwin2025');
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();
    let chatButton = page.locator('_react=ChatToggle');
    await expect(chatButton).toBeVisible();
    await page.locator('_react=UserIcon').first().click();
    await page.getByText('Logout').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    chatButton = page.locator('_react=ChatToggle');
    await expect(chatButton).not.toBeVisible();
  });
});

test.describe('User in in Scenario', () => {
  
  test('Chat button is visible', async ({ page }) => {
    
    const chatButton = page.locator('_react=ChatToggle');
    await expect(chatButton).toBeVisible();
  });

  test('Close Chat Modal', async ({ page }) => {

    page.locator('.closeChat').click();
    const chatModal = page.locator('.AppChatPanel');
    await expect(chatModal).toHaveClass(/(^|\s)closed(\s|$)/);
  });

  test('Chat button is click it, chat madal is open', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();
    const chatModal = page.locator('.AppChatPanel');
    await expect(chatModal).toHaveClass(/(^|\s)opened(\s|$)/);
  });

  test('Chat button is click twice, chat madal is close', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();
    await chatButton.click();
    const chatModal = page.locator('.AppChatPanel');
    await expect(chatModal).toHaveClass(/(^|\s)closed(\s|$)/);
  });

  test('Check number of connected users', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();

    const chateHeader = page.locator('_react=UserLevel').first();
    await expect(chateHeader).toBeVisible();
    const activeUsers = await chateHeader.locator('_react=Span').first().innerHTML();
    expect(parseInt(activeUsers)).toBeGreaterThan(0);
  });

  test('Check if Earn button is click it, Earn modal is opened', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();

    const chatFooterOptions = page.locator('_react=ChatOptionsFooter').first();
    const chatFooterEarnButton = chatFooterOptions.locator('_react=Button').first();
    await chatFooterEarnButton.click();
    await expect(page.getByText('Invite friends, earn tokens!')).toBeVisible();
  });

  test('Check if Tip button is click it, Earn modal is opened', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();

    const chatFooterOptions = page.locator('_react=ChatOptionsFooter').first();
    const chatFooterEarnButton = chatFooterOptions.locator('_react=Button').nth(1);
    await chatFooterEarnButton.click();
    await expect(page.getByText('Tip User')).toBeVisible();
  });

  test('Send a message and check if message is on Chat body', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();

    await page.getByRole('textbox', { name: 'Message' }).click();
    await page.getByRole('textbox', { name: 'Message' }).fill('PlayWright Test 1');
    await page.getByRole('textbox', { name: 'Message' }).press('Enter');
    const chatBody = page.locator('_react=ChatLog').first();
    const chatBodyMessage = chatBody.locator('_react=ChatMessageCard').last();
    await expect(chatBodyMessage).toBeVisible();
    const messageText =  chatBodyMessage.locator('_react=MessageContent').first();
    const messageTitle = chatBodyMessage.locator('_react=MessageTitle').first();
    await expect(messageTitle).toBeVisible();
    await expect(messageText).toBeVisible();
    const textContent = messageText.locator('_react=TextContent').first();
    await expect(textContent).toBeVisible();
    const spanText = await textContent.locator('_react=Span').all();
    let messageTextContent = '';
    for (const el of spanText) {
      const elText = await el.innerHTML();
      messageTextContent = messageTextContent.length === 0 ? elText : `${messageTextContent} ${elText}`;
    }
    
    console.log(messageTextContent);
    expect(messageTextContent).toBe('PlayWright Test 1');
    const spanTitle = messageTitle.locator('_react=Span').first();
    await expect(spanTitle).toBeVisible();
    const messageTitleContent = await spanTitle.innerHTML();
    expect(messageTitleContent).toBe('josue');    
  });

  test.only('Check if disabled button is not clickable', async ({ page }) => {
    
    //Close Modal in case it is open
    page.locator('.closeChat').click();
    const chatButton = page.locator('_react=ChatToggle');
    await chatButton.click();
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByText('Highroller').click();
    const sendButton = page.locator('.ChatFooter > div:nth-child(2) > .Button');
    await expect(sendButton).toBeDisabled();
    const inputMessage = page.getByRole('textbox', { name: 'Unable to chat' });
    await expect(inputMessage).toBeVisible();
    await expect(inputMessage).toBeDisabled();
  });

});
