import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addCardAndUpdate } from '../actions';

export default function AddCardScreen({ navigation, route }) {
  const deckTitle = route.params?.title ?? '';
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      addCardAndUpdate({
        deck: { title: deckTitle },
        card: { question, answer },
      })
    );
    navigation.navigate('DeckDetails', { title: deckTitle });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TextInput
        style={styles.textinput}
        onChangeText={setQuestion}
        value={question}
        placeholder="enter the question here"
        placeholderTextColor="#c2c2c2"
      />
      <TextInput
        style={styles.textinput}
        onChangeText={setAnswer}
        value={answer}
        placeholder="enter the answer here"
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
  },
  textinput: {
    width: '90%',
    padding: '2%',
    color: '#0000ff',
    backgroundColor: '#ffffff',
    fontSize: 24,
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
