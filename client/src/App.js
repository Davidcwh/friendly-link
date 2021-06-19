import './App.css';
import React from 'react';
import ShortenUrlBar from './components/ShortenUrlBar.js';
import TopBar from './components/TopBar';

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <TopBar/>
                <ShortenUrlBar/>
            </header>
        </div>
  );
}

export default App;
