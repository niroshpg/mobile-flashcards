import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';

export default  function DeckDetails({title,count,navigation,onAddCard,onStartQuiz}){

  return (
    <View style={styles.container}>
      <Text style={styles.titletext}>{title}</Text>
      <Text style={styles.counttext}>{count} cards</Text>
      <TouchableHighlight
        style={styles.addcardbutton}
        onPress={()=>{
          navigation.navigate('AddCard',{
          title: title,
          count: count,
        });
        }}>
        <Text style={styles.addcardbuttontext}>Add Card</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={(count<1)?styles.startquizbuttonDisabled:styles.startquizbutton}
        onPress={()=>{
          navigation.navigate('StartQuiz',{
            title: title,
            count: count,
          });
          clearLocalNotification().then(setLocalNotification);
        }}
        disabled={count<1}>
        <Text style={(count<1)?styles.startquizbuttontextDisabled:styles.startquizbuttontext}>Start Quiz</Text>
      </TouchableHighlight>
    </View>
  );
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
  startquizbuttontextDisabled: {
      width: '90%',
      padding: '2%',
      color: '#f2f2f2',
      backgroundColor: 'grey',
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
  },
  startquizbuttonDisabled: {
    width: '50%',
    padding: '2%',
    backgroundColor: "grey",
    margin:'1%',
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
  }
});
