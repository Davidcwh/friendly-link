import React from 'react';
import { Navbar } from 'react-bootstrap';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const TopBar = () => {
    return (
        <Navbar 
            expand="lg"
            fixed="top"
            variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <LoginButton/>
                <SignupButton/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
