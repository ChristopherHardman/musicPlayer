import React, { Component } from 'react';
import './App.css';
import SongList from './songList'
import Timer from './timer';
import Control from './control';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedSong: undefined,
      playing: undefined,
      status: undefined,
      time: 0,
      timer: null,
    }
  }

  songSelect = e => {
    e.preventDefault();
    this.setState({selectedSong: e.target.id})
  }

  playSong = e => {
    e.preventDefault();
    if (this.state.playing !== this.state.selectedSong) {
      clearInterval(this.state.timer);
      this.setState({time: 0})
      let a =  setInterval(()=>{ this.setState({time: this.state.time+1})}, 1000)
      this.setState({timer: a, status:'Playing', playing: this.state.selectedSong})
    }
    else {
      if (this.state.selectedSong && this.state.status !== 'Playing') {
        let b =  setInterval(()=>{ this.setState({time: this.state.time+1})}, 1000)
        this.setState({timer: b, status:'Playing', playing: this.state.selectedSong})
      }
    }
  }

  stopSong = e => {
    e.preventDefault();
    clearInterval(this.state.timer);
    this.setState({time: 0, status: 'Stopped'})
  }

  pauseSong = e => {
    e.preventDefault();
    clearInterval(this.state.timer);
    this.setState({status: 'Paused'})
  }

  render() {

    let duration, imageLink, progress, songInfo;
    if (this.state.playing) {
      songInfo = SongList.filter(s=> s.song === this.state.playing)
    }
    else {
      songInfo = SongList.filter(s=> s.song === this.state.selectedSong)
    }
    if (songInfo.length > 0) {
      duration = songInfo[0].duration;
      imageLink = `/songs/${songInfo[0].album}.jpg`;
      progress = this.state.time <= songInfo[0].duration ?
        `${this.state.time/songInfo[0].duration*400}px`
        : `400px`;
    }

    return (
      <div id="musicPlayer">

        <div id="musicPlayerUpper">
          <div id="songList">
            Available Songs
            <div className="songListEntry">
            <div className="songListEntryName">Song</div>
            <div className="songListEntryArtist">Artist</div>
            <div className="songListEntryDuration">Time</div>
          </div>
          {SongList.map((s,idx)=>
           <div
              className="songListEntry"
              key={idx} id={s.song}
              onClick={this.songSelect}
              style={{backgroundColor: this.state.selectedSong === s.song ? "#f2f2f2" : "white"}}
            >
              <div className="songListEntryName" id={s.song}>{s.song}</div>
              <div className="songListEntryArtist"id={s.song}>{s.artist}</div>
              <div className="songListEntryDuration" id={s.song}>
                {parseInt(s.duration/60, 10)} : {parseInt(s.duration % 60, 10)}
              </div>
            </div>
          )}
          </div>
          <div id="image">
            <img src={imageLink} alt={imageLink} height="250" width="250" ></img>
          </div>
        </div>

        <Timer
          time={this.state.time}
          duration={duration}
          progress={progress}
        />

        <div id="songDescription">
          {this.state.playing ?
            this.state.status
            :
            null
          }
          <span> </span>
          {this.state.playing ?
            this.state.playing
            :
            null
          }
        </div>

        <Control
          pause={this.pauseSong}
          play={this.playSong}
          stop={this.stopSong}
        />

      </div>
    );
  }
}

export default App;
