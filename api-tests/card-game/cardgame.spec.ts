import { test, type Page, expect } from '@playwright/test';
import { checkSiteIsUp, checkBlackjack } from "../../helpers";

test.beforeEach(async ({ page }: {page: Page}) => {
  await page.goto('https://deckofcardsapi.com/');
});


test('CARD Game API Test', async ({page}) => {
    
  const expectedTitle = 'Deck of Cards API';
  const NEW_DEK_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
  const GET_SHUFFLE_ENDPOINT = deckId => `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
  const GET_DRAW_CARD_ENDPOINT =  (deckId, noOfCards) => `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${noOfCards}`
  
  await checkSiteIsUp(page, expectedTitle);

    // 1: Get a new deck
    const newDeckResponse = await page.goto(NEW_DEK_ENDPOINT).then(res => res?.json());
    const currentDeckId = newDeckResponse.deck_id;
  
    // 2: Shuffle the deck
    const shuffleResponse = await page.goto(GET_SHUFFLE_ENDPOINT(currentDeckId)).then(res => res?.json());
  
    // 3: Deal three cards to each of two players, so total 6 cards needs to be drawn
    const dealResponse = await page.goto(GET_DRAW_CARD_ENDPOINT(currentDeckId, 6)).then(res => res?.json());
  
    // dealResponse has 6 cards as json objects inside cards array
    // Extracting cards for each player
    const player1Cards = dealResponse.cards.slice(0, 3); // Getting first 3 cards from cards array
    const player2Cards = dealResponse.cards.slice(3); // getting last 3 cards from cards array
  
    // 4: Check whether either has blackjack
    const hasBlackjackPlayer1 = checkBlackjack(player1Cards);
    const hasBlackjackPlayer2 = checkBlackjack(player2Cards);
  
    // 5: If either has blackjack, write out which one does
    if (hasBlackjackPlayer1) {
      console.log('Player 1 has blackjack!');
    }
    if (hasBlackjackPlayer2) {
      console.log('Player 2 has blackjack!');
    }
  
    // Expectations 
    expect(newDeckResponse).toHaveProperty('success', true);

    expect(shuffleResponse).toHaveProperty('shuffled', true);
 
    expect(dealResponse).toHaveProperty('cards');
});

