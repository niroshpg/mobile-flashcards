import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {getDecks} from '../utils/api';

import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';

export default class DeckDetailsScreen extends React.Component {
  static navigationOptions = {
      title: 'DeckDetails',
      headerStyle: { backgroundColor: '#2EC4B6' },
      headerTitleStyle: { color: '#f0f0f0' },
    };

  constructor(props) {
      super(props);
      this.state = {
        title: this.props.navigation.getParam('title',''),
        count: this.props.navigation.getParam('count',''),
      };
  }

  componentDidMount (){
    getDecks().then(
      (results)=>{
        let title = this.state.title;
        this.setState({
          count: results[title].questions.reduce((count,question)=>{
            return count + 1;
          },0),
        });
    });
  }

  onAddCard = ()=>{
    const { navigation} = this.props;
    const { title,count} = this.state;
    navigation.navigate('AddCard',{
    title: title,
    count: count,
  });
 }

  onStartQuiz = ()=>{
    const { navigation} = this.props;
    const { title,count} = this.state;
    navigation.navigate('StartQuiz',{
      title: title,
      count: count,
    });

    clearLocalNotification()
      .then(setLocalNotification)
 }

  render() {
    const { title,count} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titletext}>{title}</Text>
        <Text style={styles.counttext}>{count} cards</Text>
        <TouchableHighlight style={styles.addcardbutton} onPress={this.onAddCard}>
          <Text style={styles.addcardbuttontext}>Add Card</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.startquizbutton} onPress={this.onStartQuiz}>
        <Text style={styles.startquizbuttontext}>Start Quiz</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  titletext: {
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: 48,
    margin:'1%',
  },
  counttext: {
    width: '90%',
    padding: '2%',
    color: '#6c9994',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: 32,
    margin:'1%',
  },
  addcardbuttontext: {
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: 32,
    margin:'1%',
  },
  startquizbuttontext: {
    width: '90%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#2EC4B6',
    textAlign: 'center',
    fontSize: 32,
    margin:'1%',
  },
  addcardbutton: {
    width: '50%',
    padding: '2%',
    backgroundColor: "#f0f0f0",
    margin:'1%',
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
  },
  startquizbutton: {
    width: '50%',
    padding: '2%',
    backgroundColor: "#2EC4B6",
    margin:'1%',
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
  }
});
