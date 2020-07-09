import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {GameType} from '../../const';
import {ActionCreator} from '../../reducers/game/game';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import GameScreen from '../game-screen/game-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';
// import {getStep, getMaxMistakes, getMistakes} from '../../reducers/game/selectors';
// import {getQuestions} from '../../reducers/data/selectors';

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));

class App extends React.PureComponent {
  _renderGameScreen() {
    const {
      mistakes,
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      resetGame,
      step,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen onReplayButtonClick={resetGame}/>
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          onReplayButtonClick={resetGame}
          questionsCount={questions.length}
          mistakesCount={mistakes}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );

        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path={`/`}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={`/artist`}>
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path={`/genre`}>
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },

  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },

  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
