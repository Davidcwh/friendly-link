import './UserDashboardPage.css';
import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import TopBar from '../components/TopBar';
import LoadingPage from './LoadingPage';

const UserDashboardPage = () => {
    return (
        <div className="Dashboard">
            <header className="Dashboard-header">
                <TopBar/>
                USER DASHBOARD
            </header>
        </div>
    )
}

export default withAuthenticationRequired(UserDashboardPage, {
    onRedirecting: () => <LoadingPage/>
});
