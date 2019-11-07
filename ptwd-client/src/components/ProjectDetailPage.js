import React from 'react';
// import ReactPlayer from 'react-player';

class ProjectPage extends React.Component {
    state = {
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }


    playVideo = () => {
        // You can use the play method as normal on your video ref
        this.refs.vidRef.play();

    };

    pauseVideo = () => {
        // Pause as well
        this.refs.vidRef.pause();
        this.refs.vidRef.currentTime = 0;
    };

    render() {

        return (

            <div>

                <div>

                    <video
                        id="project-Being-Worked-On"
                        ref="vidRef"
                        src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
                        type="video/mp4"
                        onMouseOver={this.playVideo}
                        onMouseLeave={this.pauseVideo}
                    />

                    <div>

                        {/* Button to work with subtitles (Add proper functions above ) */}
                        <button onClick={this.playVideo}>
                            Play!
                    </button>

                        <button onClick={this.pauseVideo}>
                            Pause!
                    </button>

                    </div>

                </div>


            </div>

            /* {<ReactPlayer url='https://res.cloudinary.com/damclaohv/video/upload/v1572728310/osoed8pv6tbs3xz19jkv.mp4'
                playing={true}
                controls={true}
                config={{
                    file: {
                        tracks: [
                            { kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true }
                        ]
                    }
                }}
            /> }*/



        );
    }
}

export default ProjectPage;