import React, { useEffect, useState } from 'react';
import { Tab, Row, Col, Nav, Tabs } from 'react-bootstrap';
import API from '../util/API';

const LinkInfo = ({ link, index }) => {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        API.getTotalClickCount(link.shortcode)
            .then(response => {
                setClickCount(response.data.clickCount);
            }, error => {
                console.log(error)
            })
    }, [])


    return (
        <Tab.Pane eventKey={link.shortcode} key={index} >
            {link.shortUrl}
            <br/>
            {link.originalurl}
            <br/>
            {`Date Created: ${link.datecreated}`}
            <br/>
            {`Number Of Clicks: ${clickCount}`}
        </Tab.Pane>
    ) 
}

const LinksDashboard = ({ userLinks }) => {

    return (
        <Tab.Container 
            id="left-tabs-example" 
            defaultActiveKey='first'>
            <Row>
                <Col >
                    <Nav variant="tabs" className="flex-column">
                        {userLinks.map((link, index) => {
                            return (
                                <Nav.Item key={index}>
                                    <Nav.Link eventKey={link.shortcode}>
                                        {link.shortUrl}
                                        <br/>
                                        {link.originalurl}
                                    </Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        {userLinks.map((link, index) => {
                            return (
                                <LinkInfo link={link} index={index} key={index}/>
                            )
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
};

export default LinksDashboard;
