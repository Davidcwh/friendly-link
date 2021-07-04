import React, { useEffect, useState } from 'react';
import { Tab, Row, Col, Nav, Tabs } from 'react-bootstrap';

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
                                <Tab.Pane eventKey={link.shortcode} key={index} >
                                    {link.shortUrl}
                                    <br/>
                                    {link.originalurl}
                                </Tab.Pane>
                            )
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
};

export default LinksDashboard;
