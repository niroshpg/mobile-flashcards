import {ADD_DECK, ADD_CARD, REMOVE_DECK} from '../actions'

function decks (state = {}, action) {

  const { deck, card } = action

  switch (action.type) {
    case ADD_DECK:
      return {
          ...state,
          [deck.title]: deck,
      }

    case ADD_CARD:
      return {
          ...state,
          [deck.title] : {
            title: deck.title,
            questions: [
              ...state[deck.title].questions,
              {...card},
            ]
          }
      }
      
    case REMOVE_DECK:
      return {
          ...state,
          [deck.title]: null,
      }
    default :
      return state
  }
}

export default decks
