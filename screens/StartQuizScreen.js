import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { getDecks } from '../utils/api';

export default function StartQuizScreen({ navigation, route }) {
  const title = route.params?.title ?? '';

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    let active = true;
    getDecks().then((results) => {
      if (active && results[title]) {
        setQuestions(results[title].questions || []);
      }
    });
    return () => {
      active = false;
    };
  }, [title]);

  const total = questions.length;

  const answerCard = (wasCorrect) => {
    if (wasCorrect) {
      setCorrect((c) => c + 1);
    }
    if (index + 1 >= total) {
      setShowSummary(true);
    } else {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const restart = () => {
    setQuestions((q) => q);
    setIndex(0);
    setShowAnswer(false);
    setShowSummary(false);
    setCorrect(0);
  };

  if (total === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.qnatext}>This deck has no cards yet.</Text>
      </View>
    );
  }

  if (showSummary) {
    return (
      <View style={styles.container}>
        <View style={styles.summary}>
          <Text style={styles.resultstext}>
            SCORE: {((correct / total) * 100).toFixed(2)} %
          </Text>
          <TouchableHighlight
            style={styles.donebutton}
            onPress={() => navigation.navigate('DeckDetails', { title })}
          >
            <Text style={styles.donebuttontext}>Back to deck</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.donebutton} onPress={restart}>
            <Text style={styles.donebuttontext}>Restart Quiz</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  const card = questions[index];
  const attempts = index + 1;

  return (
    <View style={styles.container}>
      <View style={styles.qna}>
        <Text style={styles.scoretext}>
          {attempts}/{total}
        </Text>
        <Text style={styles.qnatext}>
          {showAnswer ? card.answer : card.question}
        </Text>
        <TouchableHighlight
          style={styles.buttons}
          onPress={() => setShowAnswer((s) => !s)}
        >
          <Text style={styles.qnatoggletext}>
            {showAnswer ? 'Question' : 'Answer'}
          </Text>
        </TouchableHighlight>
      </View>

      <TouchableHighlight style={styles.buttons} onPress={() => answerCard(true)}>
        <Text style={styles.correctbuttontext}>Correct</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttons}
        onPress={() => answerCard(false)}
      >
        <Text style={styles.incorrectbuttontext}>Incorrect</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
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
  scoretext: {
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f2f2f2',
    fontSize: 32,
    margin: '1%',
    textAlign: 'left',
  },
  resultstext: {
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f2f2f2',
    fontSize: 36,
    margin: '1%',
    textAlign: 'center',
  },
  qnatext: {
    width: '90%',
    padding: '2%',
    color: '#2EC4B6',
    backgroundColor: '#f2f2f2',
    fontSize: 48,
    margin: '1%',
    textAlign: 'center',
  },
  qnatoggletext: {
    width: '90%',
    color: '#99320d',
    backgroundColor: '#f2f2f2',
    fontSize: 24,
    margin: '1%',
    textAlign: 'center',
  },
  buttons: {
    width: '80%',
    padding: '2%',
    backgroundColor: '#f2f2f2',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctbuttontext: {
    width: '70%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#208030',
    margin: '1%',
    fontSize: 36,
    textAlign: 'center',
  },
  incorrectbuttontext: {
    width: '70%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#cc3a20',
    margin: '1%',
    fontSize: 36,
    textAlign: 'center',
  },
  donebuttontext: {
    width: '90%',
    padding: '2%',
    color: '#f2f2f2',
    backgroundColor: '#2EC4B6',
    textAlign: 'center',
    fontSize: 32,
    margin: '1%',
  },
  donebutton: {
    width: '50%',
    backgroundColor: '#2EC4B6',
    margin: '1%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
  },
});
