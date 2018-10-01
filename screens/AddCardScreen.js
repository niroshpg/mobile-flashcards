import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {addCardToDeck} from '../utils/api'

export default class AddCardScreen extends React.Component {

  static navigationOptions = {
      title: 'AddCard',
      headerStyle: { backgroundColor: '#2EC4B6' },
      headerTitleStyle: { color: '#f0f0f0' },
    };

  constructor(props) {
      super(props);
      this.state = {
        question: '',
        answer: '',
        deckTitle: this.props.navigation.getParam('title',''),
      };
    }


  onQuestionChanged = (question) => {
      this.setState({question})
  }

  onAnswerChanged = (answer) => {
      this.setState({answer})
  }

  onSubmit = () => {
        const {deckTitle,question,answer} = this.state;
        addCardToDeck({
            deckId: deckTitle,
            card: {
                  question: question,
                  answer: answer,
            },
          }
        );
        this.props.navigation.navigate('DeckDetails',{})
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
        <TextInput
          style={styles.textinput}
          onChangeText={this.onQuestionChanged}
          value={this.state.question}
          placeholder={'enter the quetion here'}
          placeholderTextColor="#c2c2c2"
          />
          <TextInput
            style={styles.textinput}
            onChangeText={this.onAnswerChanged}
            value={this.state.answer}
            placeholder={'enter the answer here'}
            placeholderTextColor="#c2c2c2"
            />
          <TouchableHighlight style={styles.submitbutton} onPress={this.onSubmit}>
            <Text style={styles.submitbuttontext}>SUBMIT</Text>
          </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    padding: '2%',
    color: '#0000ff',
    backgroundColor: "#ffffff",
    fontSize: 24,
    margin:'1%'
  },
  textinput: {
      width: '90%',
      padding: '2%',
      color: '#0000ff',
      backgroundColor: "#ffffff",
      fontSize: 24,
      margin:'1%'
  },
  buttons: {
      width: '50%',
      padding: '2%',
      backgroundColor: "#ffffff",
      margin:'1%'
    },
    submitbuttontext: {
      width: '90%',
      padding: '2%',
      color: '#f2f2f2',
      backgroundColor: '#2EC4B6',
      textAlign: 'center',
      fontSize: 32,
      margin:'1%',
    },
    submitbutton: {
      width: '50%',
      backgroundColor: "#2EC4B6",
      margin:'1%',
      borderColor: "#000000",
      borderWidth: 1,
      borderRadius: 10,
    }
});
