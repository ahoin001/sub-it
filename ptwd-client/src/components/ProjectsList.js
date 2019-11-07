//TODO LIST 
/*

3. Be able to get projects from backend to populate projectlist with project components

*/


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
        if(!this.props.theUser) {
            this.props.history.push('/login')
        }
        console.log("this is the did mount and the props ========= ", this.props)
        // Calls endpoint in backend that returns projects from a logged in user 
        axios.get(`http://localhost:3001/dashboard/${this.props.theUser._id}`)// secure sending
            .then(response => {
                console.log("...............", response);
                this.setState({ projectsOfUser: response.data });
            })
            .catch(function (error) {
                console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                console.log(error);
            })

    };



    render() {

        let numOfProjects = [1, 2, 3, 4, 5, 6, 7];
        const listItems = this.state.projectsOfUser.map((num) =>
            <li key={num}>
                <Project />
            </li>
        );


        return (

            <div className="project-container" >

                <ul>
                    {this.state.projectsOfUser && listItems}
                </ul>

            </div>

        );
    }
}


export default ProjectsList;