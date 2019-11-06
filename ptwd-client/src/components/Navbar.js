import React from 'react';

const navbar = props => {

    const navBar = {
        display: 'flex',
        justifyContent: 'flex-end',
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

                <li style={navItems}>Home</li>
                <li style={navItems}>About</li>
                <li style={navItems}>WOW</li>
                <li style={navItems}>Contact</li>

            </ul>

        </div>
    );
};

export default navbar;
