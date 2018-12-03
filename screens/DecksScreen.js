import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native';

import { connect } from 'react-redux'

import {getDecks,deleteDeckTitle} from '../utils/api'
import {addDeck,removeDeck} from '../actions';

import DeckSummary from '../components/DeckSummary'

class DecksScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks',
    header: null,
  };

  constructor(props) {
      super(props);
      this.state = {
        refreshDecks: false,
      };
      this.removeItem.bind(this);
      this.renderItem.bind(this);
  }

  componentDidMount (){

    getDecks().then(
      (results)=> {
        Object.keys(results).map((key)=>{
          this.props.dispatch(addDeck({
              ...results[key],
          }))
        });
    });
  }

  renderItem = ({ item}) => {
    const count = Array.isArray(item.questions)?item.questions.length:0;
    return <DeckSummary title={item.title}
         count={count}
         navigation={this.props.navigation}
         removeItem={this.removeItem}/>

  }



  removeItem = (title)=>{

    const {refreshDecks} = this.state;
    this.props.dispatch(removeDeck({
      title: title,
    }))
    deleteDeckTitle({
        title: title,
      }
    );

  }



  render() {
      const {decks} = this.props;
      const {navigate} = this.props.navigation;
      const deck_arr = Object.keys(decks).map((key)=>{

        return decks[key]
      }).filter(Boolean);
    return (
      <View style={styles.container}>
          <FlatList style={styles.flatlist}
            data={deck_arr}
            renderItem={this.renderItem}
            extraData={this.props.decks}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }

}

// Alert.alert(
//     `Adding ${key}`,
//     'Adding ... ?',
//     [
//       { text: 'Cancel', onPress: () => {
//
//       }, style: 'cancel' },
//       { text: 'OK', onPress: () => {
//
//       }},
//     ],
//     { cancelable: false }
//   )

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

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps (decks){

  return {
    decks: isEmpty(decks) ? []: Object.keys(decks).map(key => decks[key]).filter(Boolean),
  }
}

export default connect(
  mapStateToProps
)(DecksScreen)
