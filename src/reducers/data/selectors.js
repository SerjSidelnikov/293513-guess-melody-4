import {createSelector} from 'reselect';
import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `artist`);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `genre`);
    }
);
