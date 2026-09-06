import React from 'react';
import { useSelector } from 'react-redux';

import DeckDetails from '../components/DeckDetails';

export default function DeckDetailsScreen({ navigation, route }) {
  const title = route.params?.title ?? '';
  const countFromNav = route.params?.count ?? 0;

  const count = useSelector((state) => {
    const deck = state[title];
    return deck && Array.isArray(deck.questions)
      ? deck.questions.length
      : countFromNav;
  });

  return (
    <DeckDetails title={title} count={count} navigation={navigation} />
  );
}
