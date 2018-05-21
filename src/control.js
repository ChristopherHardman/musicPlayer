import React, { Component } from 'react';

class Control extends Component {
   render() {
    return (
      <div id="controlPanel">
        <div id="stopButton" onClick={this.props.stop}></div>
        <div id="pauseButton" onClick={this.props.pause}>
            <div></div>
            <div></div>
        </div>
        <div id="playButton" onClick={this.props.play}></div>
      </div>
    );
  }
}

export default Control;
