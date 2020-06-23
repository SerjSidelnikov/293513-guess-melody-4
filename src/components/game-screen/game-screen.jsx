import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header';
import {GameType} from '../../const';

const GameScreen = ({type, children}) => {
  return (
    <section className={`game game--${type}`}>
      <Header/>

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
};

export default GameScreen;
