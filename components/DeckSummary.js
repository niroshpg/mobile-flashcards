import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class DeckSummary extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
      super(props);
      this.state = {
        title: this.props.item.title,
        count: Array.isArray(this.props.item.questions)?this.props.item.questions.length:0,
      };
  }

  render() {
    const {navigation} = this.props;
    const {title,count} = this.state;

    return (
      <TouchableHighlight onPress={() => {
            navigation.navigate('DeckDetails',{
            title: title,
            count: count,
          })
        }
      }>
      <View style={styles.container}>
        <Text style={styles.titletext}>{title}</Text>
        <Text style={styles.counttext}>{count} cards</Text>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '100%',
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
  titletext: {
    width: '60%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: "#ffffff",
    fontSize: 36,
    margin:'1%'
  },
  counttext: {
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: "#2EC4B6",
    fontSize: 20,
    margin:'1%',
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  }
});
