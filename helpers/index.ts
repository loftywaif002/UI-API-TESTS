import {expect, type Page } from '@playwright/test';

// Confirm that the site is up by getting the page title and matching with expected string
export async function confirmReset(page: Page) {
  // Confirming game has been restarted by looking at the first orange piece's position
  const occupiedImageSRC = 'you1.gif';
  const firstOrangePiece = await page.locator('img[name="space62"]').first();
  expect(await firstOrangePiece.getAttribute('src')).toBe(occupiedImageSRC);
}


// Confirm that the site is up by getting the page title and matching with expected string
export async function checkSiteIsUp(page: Page, title: String) {

  
  const pageTitle = await page.title();
  expect(pageTitle).toBe(title);
}

export async function restartCheckers(page: Page) {
     // Restart the game
    // Find the <a> tag with the text "Restart"
    const restartLink = await page.locator('a:has-text("Restart")').first();
    // Click on the link if found
   if (restartLink) {
     await restartLink.click();
   }
}

export async function makeFiveLegalOrangeMoves(page: Page) {
  const expectedImageSrcAfterMove="https://www.gamesforthebrain.com/game/checkers/you2.gif";
  const grayImageSRC = 'https://www.gamesforthebrain.com/game/checkers/gray.gif';
  
  // First move diagonally right
  const space62Div = await page.locator('img[name="space62"]').first();
  if (space62Div) {
    await space62Div.click();
  }
  const space53Div = await page.locator('img[name="space53"]').first();
  if (space53Div) {
    await space53Div.click();
  }
  // Confirming if orange piece has been moved
  const diagonalDestination1 = await page.locator('img[name="space53"]').first();
  expect(await diagonalDestination1.getAttribute('src')).toBe(expectedImageSrcAfterMove);

  // Wait for 5 seconds, for page to be updated
 await page.waitForTimeout(5000);

  // Second move diagonally right
  const space42Div = await page.locator('img[name="space42"]').first();
  if (space42Div) {
    await space42Div.click();
  }
  const space33Div = await page.locator('img[name="space33"]').first();
  if (space33Div) {
    await space33Div.click();
  }
  // Confirming if orange piece has been moved
  const diagonalDestination2 = await page.locator('img[name="space33"]').first();
  expect(await diagonalDestination2.getAttribute('src')).toBe(expectedImageSrcAfterMove); // It is empty space, because of this move , blue will take out orange


  await page.waitForTimeout(5000);

  // Third move diagonally
  const space22Div = await page.locator('img[name="space22"]').first();
  if (space22Div) {
    await space22Div.click();
  }

  const space13Div = await page.locator('img[name="space13"]').first();
  if (space13Div) {
    await space13Div.click();
  }

  // Confirming if orange piece has been moved
  const diagonalDestination3 = await page.locator('img[name="space22"]').first();
  expect(await diagonalDestination3.getAttribute('src')).toBe(grayImageSRC);

  await page.waitForTimeout(5000);

  // Fourth move diagonally left
  const space11Div =  await page.locator('img[name="space11"]').first();
  if (space11Div) {
    await space11Div.click();
  }
  
  if (space22Div) {
    await space22Div.click();
  }

   // Confirming if orange piece has been moved
   const diagonalDestination4 = await page.locator('img[name="space11"]').first();
   expect(await diagonalDestination4.getAttribute('src')).toBe(grayImageSRC); 

   await page.waitForTimeout(5000);

  // Fifth move diagonally right, taking out blue
  const space51Div = await page.locator('img[name="space51"]').first();
  if (space51Div) {
    await space51Div.click();
  }
  const space33Div2 = await page.locator('img[name="space33"]').first();
  // taking the blue piece, taking revenge!!
  if (space33Div2) {
    await space33Div2.click();
  }

  const diagonalDestination5 = await page.locator('img[name="space51"]').first();
  expect(await diagonalDestination5.getAttribute('src')).toBe(grayImageSRC);
}


