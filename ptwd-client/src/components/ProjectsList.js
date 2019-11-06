import React from 'react';
import Project from './Project'
import axios from "axios";
// Import Personal Card Styling AND CONTAINER STYLING
import '../ProjectStyles.css'

class ProjectsList extends React.Component {

    constructor() {
        super();

        this.state = {
            // Will Contain array of projects that belong to the loggged in user
            projectsOfUser: []
        }

    }

    componentDidMount = () => {

        // Calls endpoint in backend that returns projects from a logged in user 
        axios.get('http://localhost:3001/dashboard/')
            .then(response => {
                console.log(response);
                this.setState({ projectsOfUser: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    };



    render() {

        let numOfProjects = [1, 2, 3, 4, 5, 6, 7];
        const listItems = numOfProjects.map(() =>
            <li>
                <Project />
            </li>
        );


        return (

            <div className="project-container" >

                <ul>
                    {listItems}
                </ul>

            </div>

        );
    }
}


export default ProjectsList;