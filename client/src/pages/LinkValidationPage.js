import './LinkValidationPage.css';
import React, {useState, useEffect} from 'react';
import LinkValidationBar from '../components/LinkValidationBar';
import API from '../util/API';
import { useParams } from 'react-router';
import LoadingPage from '../pages/LoadingPage';

const LinkValidationPage = () => {
    const { shortcode } = useParams();
    const [encryption, setEncryption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasLinkError, setHasLinkError] = useState(false);
    const [linkError, setLinkError] = useState('');

    useEffect(() => {
        API.getLinkEncryption(shortcode)
            .then(response => {
                const { encryption } = response.data;
                const { cipherText } = encryption;
                if(!cipherText) {
                    // immediately redirect to original url
                    API.goToOriginalUrl(shortcode)
                        .then(response => {
                            window.location = response.data.originalUrl;
                        }, error => {
                            setHasLinkError(true);
                            setLinkError('Error Retreiving Original Link');
                        });

                } else {
                    setIsLoading(false);
                    setEncryption(encryption);
                }
            }, error => {
                setIsLoading(false);
                setHasLinkError(true);
                if (error.response.status === 404) {
                    setLinkError('Requested Link Does Not Exist');
                } else {
                    setLinkError('Error Retreiving Original Link');
                }
            })
    }, [])
    return (
        <>
        {
            isLoading ?
                <LoadingPage/> : 
                <div className="Dashboard">
                    <header className="Dashboard-header">
                        {
                            hasLinkError ?
                                <div>{linkError}</div> :
                                <LinkValidationBar title="Link Locked" encryption={encryption} shortcode={shortcode}/>
                        }
                    </header>
                </div>
        }
        
        </>
    )
}

export default LinkValidationPage;