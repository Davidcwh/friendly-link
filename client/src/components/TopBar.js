import React from 'react';
import { Navbar, Spinner, Button } from 'react-bootstrap';
import { Route } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import GoToDashboardButton from './GoToDashboardButton';

const LoggedInButtons = () => (
    <>
        <Route exact path="/">
            <GoToDashboardButton/>
        </Route>
        <LogoutButton/>
    </>
);

const LoggedOutButtons = () => (
    <>
        <LoginButton/>
        <SignupButton/>
    </>
)

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
                            ? <LoggedInButtons/> 
                            : <LoggedOutButtons/>)
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
