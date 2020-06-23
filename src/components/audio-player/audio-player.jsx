import React from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({isLoading: false});
    };

    audio.onplay = () => {
      this.setState({isPlaying: true});
    };

    audio.onpause = () => {
      this.setState({isPlaying: false});
    };

    audio.ontimeupdate = () => {
      this.setState({
        progress: audio.currentTime,
      });
    };
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.src = ``;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const {onPlayButtonClick} = this.props;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            this.setState((prevState) => ({
              isPlaying: !prevState.isPlaying,
            }));
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
