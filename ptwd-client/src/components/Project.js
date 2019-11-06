//TODO LIST 
/*
1. Change image cards to videos 
2. Make Sure Video plays on hover and restarts on mosue leave
3. Be able to get projects from backend to populate project components


*/
import React from 'react';

// Import Personal Card Styling
import '../ProjectStyles.css'

const Project = (props) => {

    return (
        <div>

            <div className="card ">
                <div className="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt='Oops'/> </div>
                <div className="card_title title-white">
                    <p>Video Title</p>
                </div>
            </div>

        </div>
    );

};

export default Project;
// TODO