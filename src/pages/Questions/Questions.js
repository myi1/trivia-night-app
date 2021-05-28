import React, { Component } from "react";
import axios from "axios";
import "./Questions.scss";

export default class Questions extends Component {
  state = {
    questions: [],
    indexPos: 0,
    isUpdated: false,
    showAnswer: false,
    prevQuestion: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getQuestions(id, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isUpdated, questions, prevQuestion } = this.state;
    let index = this.state.indexPos;

    if (index < questions.length - 1 && isUpdated && !prevQuestion) {
      index++;
      this.setState({
        ...this.state,
        indexPos: index,
        isUpdated: false,
      });
    }
    if (isUpdated && prevQuestion) {
      index--;
      this.setState({
        ...this.state,
        indexPos: index,
        isUpdated: false,
        prevQuestion: false,
      });
    }
  }

  goNextQuestion = () => {
    this.setState({
      ...this.state,
      isUpdated: true,
      showAnswer: false,
    });
  };

  goPrevQuestion = () => {
    this.setState({
      ...this.state,
      isUpdated: true,
      showAnswer: false,
      prevQuestion: true,
    });
  };

  handleShowClick = () => {
    this.setState({
      ...this.state,
      showAnswer: true,
    });
  };

  getQuestions(id) {
    axios
      .get(`http://jservice.io/api/category/?id=${id}`)
      .then((response) => {
        const questions = response.data.clues;

        this.setState({
          ...this.state,
          questions: questions,
        });
      })
      .catch((err) => {
        console.log("API Request Failed: ", err);
      });
  }

  render() {
    const { questions, indexPos, showAnswer } = this.state;
    console.log(questions.length);
    console.log(indexPos);
    let answer;
    let previousQuestionButton;
    let nextQuestionButton;
    if (questions.length === 0) {
      return <p>Loading Questions...</p>;
    }
    if (showAnswer) {
      answer = (
        <p className='question__answer-body'>{questions[indexPos].answer}</p>
      );
    } else {
      answer = (
        <button className='question__button' onClick={this.handleShowClick}>
          👀 Show Answer
        </button>
      );
    }
    if (indexPos !== 0) {
      previousQuestionButton = (
        <button className='question__button' onClick={this.goPrevQuestion}>
          👈 Previous Question
        </button>
      );
    }
    if (indexPos < questions.length - 1) {
      nextQuestionButton = (
        <button className='question__button' onClick={this.goNextQuestion}>
          👉 Next Question
        </button>
      );
    }

    return (
      <div className='question'>
        <h1 className='question__header'>Question</h1>
        <p className='question__body'>{questions[indexPos].question}</p>
        <h2 className='question__answer-header'>Answer</h2>
        <div className='question__button-container'>
        {answer}
        {nextQuestionButton}
        {previousQuestionButton}
        </div>
      </div>
    );
  }
}
