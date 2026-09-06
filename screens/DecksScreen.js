import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { getDecks, deleteDeckTitle } from '../utils/api';
import { addDeck, removeDeck } from '../actions';
import DeckSummary from '../components/DeckSummary';

function selectDecks(state) {
  return Object.keys(state)
    .map((key) => state[key])
    .filter(Boolean);
}

export default function DecksScreen({ navigation }) {
  const dispatch = useDispatch();
  const decks = useSelector(selectDecks);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getDecks().then((results) => {
        if (!active) return;
        Object.keys(results).forEach((key) => {
          dispatch(addDeck({ ...results[key] }));
        });
      });
      return () => {
        active = false;
      };
    }, [dispatch])
  );

  const removeItem = (title) => {
    dispatch(removeDeck({ title }));
    deleteDeckTitle({ title });
  };

  const renderItem = ({ item }) => {
    const count = Array.isArray(item.questions) ? item.questions.length : 0;
    return (
      <DeckSummary
        title={item.title}
        count={count}
        navigation={navigation}
        removeItem={removeItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={decks}
        renderItem={renderItem}
        extraData={decks}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  flatlist: {
    width: '90%',
    marginLeft: '1%',
    marginRight: '1%',
  },
});
