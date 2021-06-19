import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import './Button.css'

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            className="buttonContainer"
            variant="outline-light" 
            onClick={() => loginWithRedirect({
                screen_hint: "signup",
                appState: {
                    returnTo: 'dashboard'
                }
            })}>
            Signup
        </Button>
    )
};

export default SignupButton;
