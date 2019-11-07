import React from 'react';
import './App.css';


import axios from "axios";

import { Switch, Route, NavLink } from "react-router-dom";


import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Navbar from './components/Navbar';
// import CountriesList from "./components/CountriesList";
import Home from "./components/Home";
import ProjectPage from './components/ProjectDetailPage';
import Project from './components/Project';
import ProjectsList from './components/ProjectsList';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    // the url of backend port we get information from 
    axios.get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromTheBackend => {
        // console.log("User in APP.JS: ", responseFromTheBackend)
        const { userDoc } = responseFromTheBackend.data;
        this.syncCurrentUSer(userDoc);
      })
      .catch(err => console.log("Err while getting the user from the checkuser route: ", err))
  }

  syncCurrentUSer(user) {
    this.setState({ currentUser: user })
  }



  render() {
    // console.log("the state in APPJS: ", this.state);
    return (
      <div >
        <Navbar
          home={<NavLink to="/" > Home </NavLink>}
          signUp= {<NavLink to="/signup-page"> Signup </NavLink>}
          projectPage={<NavLink to="/aProjectPage" > ProjectPage </NavLink>}
          login={<NavLink to="/login"> Login </NavLink>}
          userProjects={<NavLink to="/ProjectsList" > Project List </NavLink>}
        />

        <Navbar />

        <header>

          <nav>

            {/* <NavLink to="/" > Home </NavLink> */}
            {/* <NavLink to="/aProjectPage" > ProjectPage </NavLink> */}
            {/* <NavLink to="/signup-page"> Signup </NavLink> */}
            {/* <NavLink to="/login"> Login </NavLink> */}
            {/* <NavLink to="/ProjectsList" > Project List </NavLink> */}

            {/* If project component needs to be seen individually */}
            {/* <NavLink to="/Project" > Project Component </NavLink> */}

          </nav>

        </header>
        <Switch>

          {/* this is example how we would render component normally */}
          {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/aProjectPage" component={ProjectPage} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/ProjectsList" render={props => <ProjectsList {...props} theUser={this.state.currentUser} />} />

          {/* <Route exact path="/countries" component={CountriesList} /> */}

          {/* if we have to pass some props down to a component,
          we can't use a standard way of rendering using component={},
          but instead we have to use render = {}  like in the example below */}
          <Route exact path="/signup-page" render={() =>
            <Signup
              currentUser={this.state.currentUser}
              onUserChange={userDoc => this.syncCurrentUSer(userDoc)}
            />
          } />

          {/* Login component goes here */}
          <Route exact path="/login" render={props => <Login {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />

        </Switch>


      </div>
    );
  }
}

export default App;
