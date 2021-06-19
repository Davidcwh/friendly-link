import './LandingPage.css';
import React from 'react';
import ShortenUrlBar from '../components/ShortenUrlBar.js';
import TopBar from '../components/TopBar';

const LandingPage = () => {
    return (
        <div className="Landing">
            <header className="Landing-header">
                <TopBar/>
                <ShortenUrlBar/>
            </header>
        </div>
    )
};

export default LandingPage;
