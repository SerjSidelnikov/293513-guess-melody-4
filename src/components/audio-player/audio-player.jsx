import React from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = React.memo(function AudioPlayer(props) {
  const {isLoading, isPlaying, onPlayButtonClick, children} = props;

  return (
    <>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => onPlayButtonClick()}
      />
      <div className="track__status">
        {children}
      </div>
    </>
  );
});

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AudioPlayer;
