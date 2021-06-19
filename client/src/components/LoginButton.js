import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import './Button.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            className="buttonContainer"
            variant="outline-light" 
            onClick={() => loginWithRedirect({
                display: "page"
            })}>
            Login
        </Button>
    )
};

export default LoginButton;
