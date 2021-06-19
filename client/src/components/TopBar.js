import React from 'react';
import { Navbar } from 'react-bootstrap';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const TopBar = () => {
    return (
        <Navbar 
            expand="lg"
            fixed="top">
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <LoginButton/>
                <SignupButton/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
