import React, { Component } from 'react';

class Timer extends Component {
   render() {
    return (
          <div id="timer">
            {this.props.time ?
              `${parseInt(this.props.time/60, 10)}
              :
              ${parseInt(this.props.time % 60, 10)}` : '0:0'
            }
            <div id="timerBarHolder">
              {this.props.progress ?
                <div id="timerBar" style={{width:this.props.progress}}></div>
                :
                null
              }
            </div>
            {this.props.duration ?
              `${parseInt(this.props.duration / 60, 10)}:${parseInt(this.props.duration % 60, 10)}`
              :
              '0:0'
            }
          </div>
    );
  }
}

export default Timer;
