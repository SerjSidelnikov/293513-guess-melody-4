import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import Header from './header';
import history from '../../history';

describe(`Header`, () => {
  it(`Header renders correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Header mistakes={0} onClickBack={() => {}}/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
