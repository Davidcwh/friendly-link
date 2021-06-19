import '../App.css';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Spinner animation="border" variant="light"/>
            </header>
        </div>
    )
};

export default LoadingPage;
