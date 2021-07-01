import './UserDashboardPage.css';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import TopBar from '../components/TopBar';
import API from '../util/API';

const UserDashboardPage = () => {
    const { user } = useAuth0();
    const { sub, email } = user;
    const is_first_login = user['http://localhost:3000/is_first_login'];
    const [createUserStatus, setCreateUserStatus] = useState('pending');
    const [userLinks, setUserLinks] = useState([]);

    useEffect(() => {
        if(is_first_login) {
            createUser();
        }
        getUserLinks();

    }, []);

    const createUser = () => {
        API.createUser(sub, email)
            .then(response => {
                setCreateUserStatus('success')
            }, error => {
                setCreateUserStatus('fail')
            })
    }

    const getUserLinks = () => {
        API.getUserLinks(sub)
            .then(response => {
                const originalLinks = response.data.map((link) => {
                    return link.originalurl
                }) 
                setUserLinks(originalLinks)
            }, error => {
                console.log(error)
            })
    }

    return (
        <div className="Dashboard">
            <header className="Dashboard-header">
                <TopBar/>
                USER DASHBOARD
                <br/>
                Your links:
                <br/>
                {userLinks.map((link, index) => {
                    return <div key={index}>{link}</div>
                })}
            </header>
        </div>
    )
}

export default UserDashboardPage;
