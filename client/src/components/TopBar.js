import React from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';

const LoggedInButtons = ({ email }) => (
    <>
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
    const { isAuthenticated, isLoading, user } = useAuth0();
    const email = isAuthenticated ? user.email : '';

    return (
        <Navbar 
            expand="lg"
            variant="dark">
            <Navbar.Brand href="/">Friendly-Link</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {
                    isLoading 
                        ? <Spinner animation="border" variant="light" style={{ margin: '8px'}}/>
                        : (isAuthenticated 
                            ? <>
                                <div>{`Logged in as: ${email}`}</div>
                                <LoggedInButtons email={email}/>
                             </>
                            : <LoggedOutButtons/>)
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
