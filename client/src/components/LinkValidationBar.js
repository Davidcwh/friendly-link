import React, { useEffect, useState } from 'react';
import './LinkValidationBar.css';
import { Col, Container, Button, Form, Fade } from 'react-bootstrap';
import API from '../util/API';
import Crypto from '../util/Crypto';

const LinkValidationBar = ({ title, encryption, shortcode }) => {
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');    

    const validatePassword = (input) => {
        const { cipherText, iv, salt } = encryption;

        Crypto.decrypt(input, cipherText, iv, salt)
            .then(result => {
                // redirect to original url
                API.goToOriginalUrl(shortcode)
                        .then(response => {
                            window.location = response.data.originalUrl;
                        }, error => {
                            console.log(error)
                        });
            }, error => {
                setShowPasswordError(true);
                setPasswordError('Incorrect password!')
            })
    }

    const handleTextChange = (text) => {
        setPassword(text);
    };

    const handleOnButtonClick = (event, callback) => {
        event.preventDefault();
        callback();
    };

    // Hide error message after 3 seconds
    useEffect(() => {
        if(showPasswordError) {
            const timer = setTimeout(() => {
                setShowPasswordError(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            } 
        }
    }, [showPasswordError]);


    return (
        <Container>
            <div className="title">{title}</div>
            <Form>
                <Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Control 
                                id="urlText"
                                placeholder="Enter Link Password" 
                                size="lg"
                                value={password}
                                onChange={e => handleTextChange(e.target.value)}
                            />
                        </Col>
                        <Col sm="auto"> 
                            {<Button 
                                type="submit"
                                variant="primary" 
                                size="lg"
                                onClick={(e) => handleOnButtonClick(e, () => validatePassword(password))}
                                disabled={password === ''}
                            >
                                Access
                            </Button>
                            }
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Form>
            <Fade in={showPasswordError} className={"error-message"}>
                <div>{passwordError}</div>
            </Fade>
        </Container>
    )
}

export default LinkValidationBar;
