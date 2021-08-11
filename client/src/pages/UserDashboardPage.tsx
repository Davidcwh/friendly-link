import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import API from '../util/API';
import Header from '../components/Header';
import LinksDashboard from '../components/LinksDashboard';
import FullContainer from '../components/FullContainer';
import { rxjsService } from '../util/RxjsService';
import { Empty } from 'antd';

const UserDashboardPage = () => {
    const { user } = useAuth0();
    // @ts-ignore: Object is possibly 'null'
    const { sub, email } = user;
    // @ts-ignore: Object is possibly 'null'
    const is_first_login = user['http://localhost:3000/is_first_login'];
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
                
            }, error => {
                console.log(error)
            })
    }

    const getUserLinks = () => {
        API.getUserLinks(sub)
            .then(response => {
                // @ts-ignore: Object is possibly 'null'
                setUserLinks(sortLinksDescDate(response.data))
                setIsLoadingLinks(false);
            }, error => {
                console.log(error);
                setIsLoadingLinks(false);
            })
    }

    // @ts-ignore: Object is possibly 'null'
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
