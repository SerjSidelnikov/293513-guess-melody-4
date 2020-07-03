import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player';

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

describe(`AudioPlayer`, () => {
  it(`AudioPlayer is rendered correctly`, () => {
    const {song} = mock;

    const tree = renderer.create(
        <AudioPlayer
          src={song.src}
          isPlaying={false}
          isLoading={true}
          onPlayButtonClick={() => {}}
        >
          <audio/>
        </AudioPlayer>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
