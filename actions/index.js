import { randomUUID } from 'expo-crypto';

import { addCardToDeck, saveDeckTitle } from '../utils/api';

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_DECK = 'REMOVE_DECK';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function removeDeck(deck) {
  return {
    type: REMOVE_DECK,
    deck,
  };
}

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card,
  };
}

export function addDeckAndUpdate(deck) {
  return (dispatch) => {
    return saveDeckTitle(deck)
      .then(() => {
        dispatch(addDeck(deck));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function addCardAndUpdate(props) {
  const { deck, card } = props;
  const cardToAdd = {
    id: randomUUID(),
    title: deck.title,
    ...card,
  };

  return (dispatch) => {
    return addCardToDeck({
      title: deck.title,
      deck,
      card: cardToAdd,
    }).then(() => {
      dispatch(addCard(deck, cardToAdd));
    });
  };
}
