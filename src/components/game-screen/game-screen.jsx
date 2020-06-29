import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../header/header';
import {GameType} from '../../const';

const GameScreen = ({type, mistakes, children}) => {
  return (
    <section className={`game game--${type}`}>
      <Header mistakes={mistakes}/>

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
};

const mapStateToProps = (state) => ({
  mistakes: state.mistakes,
});

export {GameScreen};

export default connect(mapStateToProps)(GameScreen);
