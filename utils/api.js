import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

function setDummyData () {
  let dummyData = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function getDecks() {
  /**
    To clear the storage delete all decks:
    deleteDecks();
    - for development
   */
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatDeckResults);
}

export function getDeck(title) {

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then( (decks)=>{
      return  JSON.parse(decks)[title];;
    })
    .catch((e) => {
        alert("Failed to load the deck");
        console.log(e);
    })
}

export function saveDeckTitle(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deck.title]= {
      ...deck
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    }).catch((e) => {
        alert("Failed to save deck title ");
        console.log(e);
    })
}

export function deleteDecks() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

export function deleteDeckTitle({title}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title]= undefined;
      delete data[title];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    }).catch((e) => {
        alert("Failed to delete the deck");
        console.log(e);
    })
}

export  function   addCardToDeck({title,card}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then( (decks)=>{
        const data = JSON.parse(decks);
        data[title].questions.push(card);
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
        return data;
      })
}

export function removeCardFromDeck({deckId,cardId}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deckId].questions = data[deckId].questions.filter((q)=>{q.id!=cardId})
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    }).catch((e) => {
        alert("Failed to remove card from the deck");
        console.log(e);
    })
}
