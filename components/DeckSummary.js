import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';


import { Entypo } from '@expo/vector-icons'

export default  function DeckSummary ({title,count,navigation,removeItem}) {

  return (
    <View style={styles.container}>
      <View style={styles.titletextcontainer}>
      <TouchableHighlight onPress={() => {
            navigation.navigate('DeckDetails',{
            title: title,
            count: count,
          })
        }
      }>
        <Text style={styles.titletext}>{title}</Text>
        </TouchableHighlight>
      </View>

      <Text style={styles.counttext}>{count} cards</Text>
      <TouchableHighlight onPress={() => {
        Alert.alert(
            `Delete  ${title}`,
            'Do you really want to delete the entire deck ?',
            [
              { text: 'Cancel', onPress: () => {

              }, style: 'cancel' },
              { text: 'OK', onPress: () => {
                removeItem(title);
              }},
            ],
            { cancelable: false }
          )
        }
      }>
        <Entypo name='cross' size={36} />
      </TouchableHighlight>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 5,
    padding: 3,
    width: '100%',
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
  titletextcontainer: {
    width: '60%',
    padding: '2%',
    backgroundColor: "#ffffff",
    margin:'1%'
  },
  titletext: {
    flex: 1,
    color: '#2EC4B6',
    backgroundColor: "#ffffff",
    fontSize: 36,
  },
  counttext: {
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: "#2EC4B6",
    fontSize: 20,
    marginTop:'2%',
    margin:'1%',
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  }
});
