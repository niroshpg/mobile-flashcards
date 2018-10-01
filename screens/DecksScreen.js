import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import {getDecks} from '../utils/api'
import DeckSummary from '../components/DeckSummary'

export default class DecksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state = {
        decks : [],
      };
  }

  componentDidMount (){
    getDecks().then(
      (results)=>{
        this.setState(() => ({
          decks: results
        }
      ))
    })
  }

  renderItem = ({ item }) => (
        <DeckSummary item={item} navigation={this.props.navigation} />
  )

  render() {
      const { decks } = this.state;
      const {navigate} = this.props.navigation;
      const deck_arr = Object.keys(decks).map((key)=>{
        return decks[key]
      });
    return (
      <View style={styles.container}>

          <FlatList style={styles.flatlist}
            data={deck_arr}
            renderItem= {this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>

    );
  }

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
  }
});
