import { useEffect, useState } from 'react';
import { Button } from "../../common/Button";
import { Form, Row, Col } from 'antd';
import API from '../../util/API';
import { useAuth0 } from '@auth0/auth0-react';
import {
    InputWrapper,
    StyledInput
} from './styles'

const ShortenUrlBar = () => {
    const [text, setText] = useState('');
    const [hasTextError, setHasTextError] = useState(false);
    const [textError, setTextError] = useState('');
    const [isShortenUrl, setIsShortenUrl] = useState(false);
    const [isTextCopied, setIsTextCopied] = useState(false);
    const { isAuthenticated, user } = useAuth0();

    const showErrorMessage = (errorMessage: string) => {
        setHasTextError(true);
        setTextError(errorMessage);
        // message.error(errorMessage);
    }
    
    const hideErrorMessage = () => {
        setHasTextError(false);
        setTextError('');
    }

    const createShortUrl = async (url: string) => {
        const userId = isAuthenticated && user !== undefined ? user.sub : null;

        API.createShortUrl(url, userId, null)
            .then(response => {
                setText(response.data.shortUrl);
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
        hideErrorMessage();
        setIsShortenUrl(false);
    };

    const handleOnButtonClick = (event: any, callback: () => void) => {
        event.preventDefault();
        callback();
    };

    const handleKeypress = (e: any) => {
        //it triggers by pressing the enter key
        const code = e.keyCode || e.which;
        if (code === 13 && text !== '') {
            if(isShortenUrl) {
                handleOnButtonClick(e, () => copyTextToClipboard(text))
            } else {
                handleOnButtonClick(e, () => createShortUrl(text))
            }
        }
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
        <Row justify="space-around" align="top">
            <Col span={20}>
                <InputWrapper>
                    <Form.Item 
                            validateStatus={hasTextError ? "error" : ""}
                            help={textError}
                        >
                        <StyledInput 
                            placeholder="Shorten your link"
                            value={text}
                            onChange={e => handleTextChange(e.target.value)}
                            size="large"
                            id="urlText"
                            onKeyPress={handleKeypress}
                        />
                    </Form.Item>
                </InputWrapper>
            </Col>

            <Col span={4}>
                {isShortenUrl ? <Button
                    disabled={false}
                    fixedWidth={true}
                    onClick={(e: any) => handleOnButtonClick(e, () => copyTextToClipboard(text))}
                >
                    {isTextCopied ? "Copied!" :"Copy"}
                </Button>:
                <Button
                    disabled={text === ''}
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
