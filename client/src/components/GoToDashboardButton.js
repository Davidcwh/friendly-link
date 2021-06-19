import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Button.css'

const GoToDashboardButton = withRouter(({ history }) => (
    <Button
        className="buttonContainer"
        variant="outline-success" 
        onClick={() => {
            history.push('/dashboard')
        }}>
        Go To Dashboard
    </Button>
))

export default GoToDashboardButton;
