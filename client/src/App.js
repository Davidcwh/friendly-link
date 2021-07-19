import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LoadingPage from './pages/LoadingPage';
import LinkValidationPage from './pages/LinkValidationPage';
import ProtectedRoute from './auth/protected-route';

function App() {
    const { isLoading, isAuthenticated } = useAuth0();

    return (
        <Switch>
            
            <Route exact path="/">
                {isAuthenticated 
                    ? <Redirect to='/dashboard'/>
                    : (
                        isLoading ? <LoadingPage/> : <LandingPage/>
                    )
                 }
            </Route>
            <ProtectedRoute exact path="/dashboard" component={UserDashboardPage}/>
            <Route path="/goto/:shortcode" component={LinkValidationPage}/>
        </Switch>
    );
}

export default App;
