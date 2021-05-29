import './App.css';
import { useEffect, useState } from 'react';
import { Col, Container, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function App() {
    const [ text, setText ] = useState('');
    const [isShortenUrl, setIsShortenUrl] = useState(false);
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const createShortUrl = (url) => {
        const params = new URLSearchParams();
        params.append('originalUrl', url);

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        axios.post('http://localhost:3000/createShortUrl', params, config)
        .then(response => {
            setText(response.data.shortUrl);
            setIsShortenUrl(true);
        }, error => {
            setShowError(true);
            console.log(error);
        });
    };

    const handleTextChange = (text) => {
        setText(text);
        setIsShortenUrl(false);
    };

    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            setIsTextCopied(true);
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
        console.error('Async: Could not copy text: ', err);
        });
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

    // Hide error message after 3 seconds
    useEffect(() => {
        if(showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            } 
        }
    }, [showError]);

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <div className="title">Friendly-Link</div>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                    className="shorten-url-text"
                                    id="urlText"
                                    placeholder="Shorten your link" 
                                    size="lg"
                                    value={text}
                                    onChange={e => handleTextChange(e.target.value)}
                                />
                            </Col>
                            <Col sm="auto"> 
                                {isShortenUrl ? 
                                <Button 
                                    bsClass="copy-button"
                                    variant={isTextCopied ? "success" : "primary"} 
                                    size="lg"
                                    onClick={() => copyTextToClipboard(text)}>
                                    {isTextCopied ? "Copied!" :"Copy"}
                                </Button>
                                : <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => createShortUrl(text)}
                                    disabled={text === ''}
                                >
                                    Shorten
                                </Button>
                                }
                            </Col>
                        </Form.Row>
                    </Form>
                    {showError && <Alert variant="danger" >
                                    <p>Unable to shorten that link</p>
                                </Alert>}
                </Container>
            </header>
        </div>
  );
}

export default App;
