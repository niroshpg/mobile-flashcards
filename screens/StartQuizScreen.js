import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {getDecks} from '../utils/api'

export default class StartQuizScreen extends React.Component {

  static navigationOptions = {
      title: 'Quiz',
      headerStyle: { backgroundColor: '#2EC4B6' },
      headerTitleStyle: { color: '#f0f0f0' },
    };

  constructor(props) {
      super(props);
      this.state = {
        showAnswer: false,
        showSummary: false,
        index: 0,
        title: this.props.navigation.getParam('title',''),
        questions:[
          'question':'',
          'answer': ''
        ],
      };
  }

  componentDidMount (){
    getDecks().then(
      (results)=>{
        let title = this.state.title;
        this.setState({
          questions: results[title].questions,
        })
    });
  }

  onShowAnswerPressed = () => {
      this.setState({
        showAnswer : true
      })
  }

  onShowQuestionPressed = () => {
      this.setState(() => ({
        showAnswer: false
      }))
  }

  onCorrectPressed = () => {
     const questions = this.state.questions;
     questions[this.state.index]= {
        ...questions[this.state.index],
       correct : true,
     };

      this.setState((state) => {
          return {
            questions,
            index: state.index + 1,

          }
        }
      );
      let completed = (this.state.index +1 > this.state.questions.length-1);

      if(completed){
        this.setState(() => ({
          showSummary: true
        }))
      }
  }

  onIncorrectPressed = () => {
    const questions = this.state.questions;
    questions[this.state.index] = {
      ...questions[this.state.index],
      correct : false,
    };

     this.setState((state) => {
         return {
           questions,
           index: state.index + 1,

         }
       }
     );
    let completed = (this.state.index +1 > this.state.questions.length-1);
    if(completed){
      this.setState(() => ({
        showSummary: true
      }))
    }
  }

  onComplete = () => {
      this.props.navigation.navigate('DeckDetails',{})
  }

  render() {
    const {showAnswer,showSummary,index,questions} = this.state;
    let correct = questions.reduce((count,question)=>{
      if(question.correct === true ){
        count = count + 1;
      }
      return count;
    },0);
    let total = questions.length;
    let attempts = index +1 < questions.length ? index + 1 : questions.length;

    return (
      <View style={styles.container}>

        {
          (showSummary) ?
          <View style={styles.summary}>
            <Text style={styles.resultstext}>SCORE: {((correct / total)*100).toFixed(2)} % </Text>
            <TouchableHighlight style={styles.donebutton} onPress={this.onComplete}>
              <Text style={styles.donebuttontext}>Done</Text>
            </TouchableHighlight>
          </View >
          :(
              (!showAnswer) ?
              <View style={styles.qna}>
                <Text style={styles.scoretext}>{attempts}/{total}</Text>
              <Text style={styles.qnatext}>{questions[index].question}</Text>
              <TouchableHighlight style={styles.buttons} onPress={this.onShowAnswerPressed}>
                <Text style={styles.qnatoggletext}>Answer</Text>
              </TouchableHighlight>
              </View >
            :
            <View style={styles.qna}>
              <Text style={styles.scoretext}>{attempts}/{total}</Text>
              <Text style={styles.qnatext}>{questions[index].answer}</Text>
              <TouchableHighlight style={styles.buttons} onPress={this.onShowQuestionPressed}>
                <Text style={styles.qnatoggletext}>Question</Text>
              </TouchableHighlight>
            </View >
          )
        }
        {
          !showSummary &&
            <TouchableHighlight style={styles.buttons} onPress={this.onCorrectPressed}>
              <Text style={styles.correctbuttontext}>Correct</Text>
            </TouchableHighlight>
        }
        {
          !showSummary &&
          <TouchableHighlight style={styles.buttons} onPress={this.onIncorrectPressed}>
            <Text style={styles.incorrectbuttontext}>Incorrect</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:  '#f2f2f2',

  },
  qna: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#f2f2f2',
    width: '90%',
    padding: '2%',
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: '2%',
  },
  buttontext: {
    width: '90%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: "#ffffff",
    fontSize: 20,
    margin:'1%'
  },
  scoretext: {
    marginTop: 0,
    width: '90%',
    padding: '2%',
    color:   "#2EC4B6",
    backgroundColor: '#f2f2f2',
    fontSize: 32,
    margin:'1%',
    textAlign: 'left'
  },
  resultstext: {
    marginTop: 0,
    width: '90%',
    padding: '2%',
    color:   "#2EC4B6",
    backgroundColor: '#f2f2f2',
    fontSize: 36,
    margin:'1%',
    textAlign: 'center'
  },
  qnatext: {
    marginTop: 0,
    width: '90%',
    padding: '2%',
    color:   "#2EC4B6",
    backgroundColor: '#f2f2f2',
    fontSize: 48,
    margin:'1%',
    textAlign: 'center'
  },
  qnatoggletext: {
    width: '90%',
    color:   "#99320d",
    backgroundColor: '#f2f2f2',
    fontSize: 24,
    margin:'1%',
    textAlign: 'center'
  },
  buttons: {
    width: '80%',
    padding: '2%',
    backgroundColor: '#f2f2f2',
    margin:'1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctbuttontext: {
    width: '70%',
    padding: '2%',
    color:   "#f2f2f2",
    backgroundColor: '#208030',
    margin:'1%',
    fontSize: 36,
    textAlign: 'center'
  },
  incorrectbuttontext: {
    width: '70%',
    padding: '2%',
    color:   "#f2f2f2",
    backgroundColor: '#cc3a20',
    margin:'1%',
    fontSize: 36,
    textAlign: 'center'
  },
  donebuttontext: {
    width: '90%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#2EC4B6',
    textAlign: 'center',
    fontSize: 32,
    margin:'1%',
  },
  donebutton: {
    width: '50%',
    backgroundColor: "#2EC4B6",
    margin:'1%',
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
  }
});
