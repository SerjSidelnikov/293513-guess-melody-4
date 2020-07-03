import React from 'react';

import AudioPlayer from '../../components/audio-player/audio-player';
import withAudio from '../with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => (
            <AudioPlayerWrapped
              src={src}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={() => {
                this.setState({
                  activePlayerId: activePlayerId === id ? -1 : id,
                });
              }}
            />
          )}
        />
      );
    }
  }

  return WrappedComponent;
};

export default withActivePlayer;
