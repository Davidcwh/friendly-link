import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LoadingPage from './pages/LoadingPage';

function App() {
    const { isLoading } = useAuth0();

    return (
        <Switch>
            <Route exact path="/">
                {isLoading ? <LoadingPage/> : <LandingPage/>}
            </Route>
            <Route exact path="/dashboard">
                <UserDashboardPage/>
            </Route>
        </Switch>
    );
}

export default App;
