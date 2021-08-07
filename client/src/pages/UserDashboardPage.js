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
import { rxjsService } from '../util/RxjsService';

const UserDashboardPage = () => {
    const { user } = useAuth0();
    const { sub, email } = user;
    const is_first_login = user['http://localhost:3000/is_first_login'];
    const [createUserStatus, setCreateUserStatus] = useState('pending');
    const [userLinks, setUserLinks] = useState([]);
    const [isLoadingLinks, setIsLoadingLinks] = useState(true);

    useEffect(() => {
        if(is_first_login) {
            createUser();
        }
        getUserLinks();

        const subscription = rxjsService.onLoad().subscribe(load => {
            setIsLoadingLinks(true);
            getUserLinks();
        });
        return subscription.unsubscribe;

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
                console.log(response.data)
                setUserLinks(sortLinksDescDate(response.data))
                setIsLoadingLinks(false);
            }, error => {
                console.log(error);
                setIsLoadingLinks(false);
            })
    }

    const sortLinksDescDate = (userLinks) => {
        const result = [];
        for(let i = userLinks.length - 1; i >= 0; i--) {
            result.push(userLinks[i]);
        }
        return result;
    }

    return (
        <FullContainer>
            <Header/>
            <LinksDashboard 
                userLinks={userLinks}
                isLoading={isLoadingLinks}
            />
        </FullContainer>
    )
}

export default UserDashboardPage;
