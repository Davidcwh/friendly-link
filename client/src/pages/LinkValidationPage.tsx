import {useState, useEffect} from 'react';
import API from '../util/API';
// @ts-ignore: Object is possibly 'null'
import { useParams } from 'react-router';
import LoadingPage from '../pages/LoadingPage';
import LinkValidationForm from '../components/LinkValidationForm';

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
                    hasLinkError ?
                    <div>{linkError}</div> :
                    <LinkValidationForm encryption={encryption} shortcode={shortcode}/>
        }
        
        </>
    )
}

export default LinkValidationPage;