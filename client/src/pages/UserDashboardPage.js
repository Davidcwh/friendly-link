// import './UserDashboardPage.css';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col } from 'react-bootstrap';
import TopBar from '../components/TopBar';
// import LinksDashboard from '../components/LinksDashboard';
import API from '../util/API';
import Header from '../components/Header';
import LinksDashboard from '../components/LinksDashboard';
import FullContainer from '../components/FullContainer';

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
                console.log(response.data)
                setUserLinks(response.data)
            }, error => {
                console.log(error)
            })
    }

    return (
        <FullContainer>
        <Header/>
        <LinksDashboard userLinks={userLinks}/>
        {/* <div className="Dashboard">
            <TopBar/>
            <header className="Dashboard-header">
                
                <Row className="bar-container">
                    <ShortenUrlBar title="User Dashboard"/>
                </Row>
                
                <Row className="links-container">
                    <LinksDashboard userLinks={userLinks}/>
                </Row>
                
            </header>
        </div> */}
        </FullContainer>
    )
}

export default UserDashboardPage;
