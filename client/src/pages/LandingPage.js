import './LandingPage.css';
import React from 'react';
import ShortenUrlBar from '../components/ShortenUrlBar.js';
import TopBar from '../components/TopBar';

const LandingPage = () => {
    return (
        <div className="Landing">
            <TopBar/>
            <header className="Landing-header">
                <ShortenUrlBar title="Friendly-Link"/>
            </header>
        </div>
    )
};

export default LandingPage;
