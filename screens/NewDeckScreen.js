import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux'

import {saveDeckTitle} from '../utils/api';
import {addDeckAndUpdate} from '../actions';

class NewDeckScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: '',
      };
    }
  onTitleChanged = (title) => {
      this.setState({title})
  }

  onSubmit = () => {
    const {title} = this.state
    if(!title) {
      return alert("title is required")
    }
    this.setState({title: ''})
    this.props.dispatch(addDeckAndUpdate({
      title: title,
      questions: [],
    }));
    this.props.navigation.navigate('DeckDetails',{
    title: title,
    count: 0,
  });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
        <Text style={styles.titletext}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={this.onTitleChanged}
            value={this.state.title}
            placeholder={'enter deck title here'}
            placeholderTextColor="#c2c2c2"
          />
          <TouchableHighlight style={styles.submitbutton} onPress={this.onSubmit}>
            <Text style={styles.submitbuttontext}>Submit</Text>
          </TouchableHighlight>
      </KeyboardAvoidingView >

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f2f2f2",
  },
  text: {
    width: '90%',
    padding: '2%',
    color: '#0000ff',
    backgroundColor: "#f2f2f2",
    fontSize: 20,
    margin:'1%'
  },
  titletext: {
    marginTop: 0,
    width: '90%',
    padding: '2%',
    color:   "#2EC4B6",
    backgroundColor: '#f2f2f2',
    fontSize: 36,
    margin:'1%',
    textAlign: 'center'
  },
  textinput: {
      width: '80%',
      padding: '2%',
      color: '#0000ff',
      backgroundColor: "#f2f2f2",
      fontSize: 32,
      margin:'1%',
      borderColor: "#000000",
      borderWidth: 1,
      borderRadius: 10,
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

export default connect()(NewDeckScreen)
