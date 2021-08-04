import { useEffect, useState } from 'react';
import { Button } from "../../common/Button";
import { Input, Row, Col, message } from 'antd';
import API from '../../util/API';
import Crypto from '../../util/Crypto';
import { useAuth0 } from '@auth0/auth0-react';
import {
    InputWrapper,
    StyledInput
} from './styles'

interface ShortenUrlBarProps {

};

const ShortenUrlBar = ({

}: ShortenUrlBarProps) => {
    const [text, setText] = useState('');
    const [isShortenUrl, setIsShortenUrl] = useState(false);
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [password, setPassword] = useState('');
    const { isAuthenticated, user } = useAuth0();

    const showErrorMessage = (errorMessage: string) => {
        message.error(errorMessage);
    }

    const createShortUrl = async (url: string) => {
        const userId = isAuthenticated && user !== undefined ? user.sub : null;

        let encryption = null;
        if(isAuthenticated && password !== '') {
            encryption = await Crypto.encrypt(password)
                                    .catch(error => {
                                        showErrorMessage('Could not encrypt password :(');
                                    });
        }

        API.createShortUrl(url, userId, encryption)
            .then(response => {
                setText(response.data.shortUrl);
                setPassword('');
                setIsShortenUrl(true);
            }, error => {
                const errorReason = error.response ? error.response.data : '';
                showErrorMessage(`Unable to shorten that link. ${errorReason}`)
            });
    };

    const copyTextToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(function() {
            setIsTextCopied(true);

            const inputElement = document.getElementById("urlText") as HTMLInputElement;
            inputElement.select();
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };

    const handleTextChange = (text: string) => {
        setText(text);
        setIsShortenUrl(false);
    };

    const handleOnButtonClick = (event: any, callback: () => void) => {
        event.preventDefault();
        callback();
    };

    // Refer button from "Copied!" to "Copy" after 1 second upon click
    useEffect(() => {
        if(isTextCopied) {
            const timer = setTimeout(() => {
                setIsTextCopied(false);
            }, 1000);

            return () => {
                clearTimeout(timer);
            } 
        }
    }, [isTextCopied]);

    return (
        <Row justify="space-around" align="middle">
            <Col span={20}>
                <InputWrapper>
                    <StyledInput 
                        placeholder="Shorten your link"
                        value={text}
                        onChange={e => handleTextChange(e.target.value)}
                        size="large"
                        id="urlText"
                    />
                </InputWrapper>
            </Col>

            <Col span={4}>
                {isShortenUrl ? <Button
                    fixedWidth={true}
                    onClick={(e: any) => handleOnButtonClick(e, () => copyTextToClipboard(text))}
                >
                    {isTextCopied ? "Copied!" :"Copy"}
                </Button>:
                <Button
                    fixedWidth={true}
                    onClick={(e: any) => handleOnButtonClick(e, () => createShortUrl(text))}
                >
                    Shorten
                </Button>}
            </Col>
        </Row>
    )
};

export default ShortenUrlBar;
