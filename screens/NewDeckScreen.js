import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addDeckAndUpdate } from '../actions';

export default function NewDeckScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!title) {
      alert('title is required');
      return;
    }
    const deckTitle = title;
    setTitle('');
    dispatch(addDeckAndUpdate({ title: deckTitle, questions: [] }));
    navigation.navigate('DecksTab', {
      screen: 'DeckDetails',
      params: { title: deckTitle, count: 0 },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titletext}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setTitle}
        value={title}
        placeholder="enter deck title here"
        placeholderTextColor="#c2c2c2"
      />
      <TouchableHighlight style={styles.submitbutton} onPress={onSubmit}>
        <Text style={styles.submitbuttontext}>Submit</Text>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  titletext: {
    marginTop: 0,
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f2f2f2',
    fontSize: 36,
    margin: '1%',
    textAlign: 'center',
  },
  textinput: {
    width: '80%',
    padding: '2%',
    color: '#0000ff',
    backgroundColor: '#f2f2f2',
    fontSize: 32,
    margin: '1%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
  },
  submitbuttontext: {
    width: '90%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#2EC4B6',
    textAlign: 'center',
    fontSize: 32,
    margin: '1%',
  },
  submitbutton: {
    width: '50%',
    backgroundColor: '#2EC4B6',
    margin: '1%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
  },
});
