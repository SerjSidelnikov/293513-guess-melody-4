import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../header/header';
import {GameType} from '../../const';
import {getMistakes} from '../../reducers/game/selectors';
import {ActionCreator} from '../../reducers/game/game';

const GameScreen = ({type, mistakes, children, goToWelcome}) => {
  return (
    <section className={`game game--${type}`}>
      <Header mistakes={mistakes} onClickBack={goToWelcome}/>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  mistakes: PropTypes.number.isRequired,
  goToWelcome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goToWelcome() {
    dispatch(ActionCreator.goToWelcome());
  },
});

export {GameScreen};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
