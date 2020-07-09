import React from 'react';
import renderer from 'react-test-renderer';

import AuthScreen from './authScreen';

describe(`AuthScreen`, () => {
  it(`AuthScreen is render correctly`, () => {
    const tree = renderer.create(
        <AuthScreen
          onReplayButtonClick={() => {}}
          onSubmit={() => {}}
        />,
        {
          createNodeMock() {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
