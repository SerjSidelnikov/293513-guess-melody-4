import React from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WrappedComponent extends React.PureComponent {
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
          progress: Math.floor(audio.currentTime),
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
          <Component
            {...this.props}
            isLoading={isLoading}
            isPlaying={isPlaying}
            onPlayButtonClick={() => {
              this.setState({isPlaying: !isPlaying});
              onPlayButtonClick();
            }}
          >
            <audio
              ref={this._audioRef}
            />
          </Component>
        </>
      );
    }
  }

  WrappedComponent.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WrappedComponent;
};

export default withAudio;
