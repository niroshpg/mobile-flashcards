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
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatDeckResults)
}

export function getDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then( (decks)=>{
      const data = JSON.parse(results);
      return data[deckId];
    })
}

export function saveDeckTitle({title}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title]= {
        title: title,
        questions : [],
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck({deckId,card}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deckId].questions.push(card);
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
