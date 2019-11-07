import React from 'react';

const navbar = props => {

    const navBar = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px 0",
        fontFamily: "Arial"
    };

    const navList = {
        display: 'flex',
        listStyle: 'none'
    };

    const navItems = {
        liststyle: 'none',
        textdecoration: 'none',
        margin: '0 15px'

    };

    return (

        <div style={navBar}>

            <ul style={navList}>

                <li style={navItems}>{props.home}</li>
                <li style={navItems}>{props.signUp}</li>
                <li style={navItems}>{props.login}</li>
                <li style={navItems}>{props.projectPage}</li>
                <li style={navItems}>{props.userProjects}</li>

            </ul>

        </div>
    );
};

export default navbar;
