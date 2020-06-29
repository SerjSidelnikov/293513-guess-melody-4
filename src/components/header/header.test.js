import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe(`Header`, () => {
  it(`Header renders correctly`, () => {
    const tree = renderer.create(
        <Header mistakes={0}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
