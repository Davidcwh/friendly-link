import './App.css';
import { useState } from 'react';
import { Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function App() {
    const [ text, setText ] = useState('');

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
            setText(response.data.shortUrl)
        }, error => {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <div className="title">Friendly-Link</div>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                    placeholder="Shorten your link" 
                                    size="lg"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </Col>
                            <Col sm="auto"> 
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={() => createShortUrl(text)}
                                >
                                    Shorten
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </header>
        </div>
  );
}

export default App;
