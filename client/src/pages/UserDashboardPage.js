import './UserDashboardPage.css';
import React from 'react';
import TopBar from '../components/TopBar';

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

export default UserDashboardPage;
