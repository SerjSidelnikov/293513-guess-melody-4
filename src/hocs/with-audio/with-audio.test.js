import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import withAudio from './with-audio';

const MockComponent = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const MockComponentWrapper = withAudio(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapper
        isPlaying={false}
        onPlayButtonClick={() => {}}
        src={``}
      />,
      {
        createNodeMock() {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
