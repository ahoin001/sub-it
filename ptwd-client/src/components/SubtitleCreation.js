import React from 'react';
import Project from './Project'
import axios from "axios";

class SubtitleCreation extends React.Component {
  state = {
    subInit: false
  }

  createSub = () => {
    let tracks = document.querySelector('video').textTracks;
    let video = document.getElementById('video');
    console.log(tracks);
    console.log(video);
    if (this.state.subInit === false){      
      let inTime = video.currentTime;
      console.log(inTime);
      // let cue = new VTTCue(inTime,null,'');
      // tracks[0].addCue(cue);        
      // subInit = true;
      this.setState({subInit: true });
      } else {
        let outTime = video.currentTime;
        console.log(outTime);
        // let cuesLength = tracks[0].cues.length;
        video.pause();
        // tracks[0].cues[cuesLength - 1].endTime = outTime;
        // console.log(tracks[0].cues[cuesLength - 1]);
        this.setState({subInit: false });
    }
  } 

  render() {

    return(
    <div>
      <button onClick={this.createSub}>Create sub</button>
    </div>

    );
  }
}

export default SubtitleCreation;