import React from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';

const TopBar = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <Navbar 
            expand="lg"
            fixed="top"
            variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {
                    isLoading 
                        ? <Spinner animation="border" variant="light" style={{ margin: '8px'}}/>
                        : (isAuthenticated 
                            ? <LogoutButton/>
                            : <>
                                <LoginButton/>
                                <SignupButton/>
                            </>)
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
