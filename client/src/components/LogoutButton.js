import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import './Button.css'

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button
            className="buttonContainer"
            variant="outline-light" 
            onClick={() => logout({
                returnTo: window.location.origin
            })}>
            Logout
        </Button>
    )
};

export default LogoutButton;
