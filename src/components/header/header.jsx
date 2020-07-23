import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Mistakes from '../mistakes/mistakes';
import {AppRoute} from '../../const';

const Header = ({mistakes, onClickBack}) => {
  return (
    <header className="game__header">
      <Link
        to={AppRoute.ROOT}
        className="game__back"
        onClick={onClickBack}
      >
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
      </Link>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle
          className="timer__line" cx="390" cy="390" r="370"
          style={{
            filter: `url(#blur)`,
            transform: `rotate(-90deg) scaleY(-1)`,
            transformOrigin: `center`,
          }}/>
      </svg>

      <Mistakes count={mistakes}/>
    </header>
  );
};

Header.propTypes = {
  mistakes: PropTypes.number.isRequired,
  onClickBack: PropTypes.func.isRequired,
};

export default Header;
