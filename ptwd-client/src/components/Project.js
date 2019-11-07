//TODO LIST 
/*
1. Fill up card with video
3. Be able to get projects from backend to populate projectlist with project components

*/

import React from 'react';

// Import Personal Card Styling
import '../ProjectStyles.css'

class Project extends React.Component {

    
    playVideo = () => {

        // References video with "vidRef" ref attribute, then plays the video
        this.refs.vidRef.play();

    };

    pauseVideo = () => {
        // References video with "vidRef" ref attribute, then pauses the video
        this.refs.vidRef.pause();
        this.refs.vidRef.currentTime = 0;
    };

    render() {

        return (
            <div>

                <div className="card ">

                    <div className="card_video">
                        {/* <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt='Oops' /> */}
                        <video
                            ref="vidRef"
                            src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
                            type="video/mp4"
                            onMouseOver={this.playVideo}
                            onMouseLeave={this.pauseVideo}
                            >
                        </video>

                    </div>

                    <div className="card_title title-white">
                        <p>Video Title</p>
                    </div>

                </div>

            </div>
        );
    }


};

export default Project;
