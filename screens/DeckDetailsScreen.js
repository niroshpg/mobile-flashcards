import React from 'react';
import DeckDetails from '../components/DeckDetails';
import { connect } from 'react-redux'

import {getDeck} from '../utils/api'

class DeckDetailsScreen extends React.Component {
  static navigationOptions = {
      title: 'DeckDetails',
      headerStyle: { backgroundColor: '#2EC4B6' },
      headerTitleStyle: { color: '#f0f0f0' },
    };

    componentDidMount(){

      const title = this.props.navigation.getParam('title','');

      getDeck(title).then(
        (results)=> {
            this.props.count= (results&& results.questions)?results.questions.length:0;
      });
    }

  render() {
    let countFromNav = this.props.navigation.getParam('count','');
    let titleFromNav = this.props.navigation.getParam('title','');
    const {decks} = this.props;

    let ss = this.props.decks.filter(deck => deck.title === titleFromNav);
    const count = (this.props.decks && ss[0] && ss[0].questions)?ss[0].questions.length:countFromNav;

    return (
      <DeckDetails title={this.props.navigation.getParam('title','')}
        count={count}
        navigation={this.props.navigation}
       />
    );
  }
}

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
)(DeckDetailsScreen)
