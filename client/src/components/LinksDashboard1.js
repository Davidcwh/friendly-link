import React, { useEffect, useState } from 'react';
import { Tab, Row, Col, Nav, Tabs } from 'react-bootstrap';
import LinkChart from './LinkChart';
import API from '../util/API';
import Crypto from '../util/Crypto';

const LinkInfo = ({ link, index }) => {
    const [totalClickCount, setTotalClickCount] = useState(0);
    const [clickCountByDate, setClickCountByDate] = useState([]);

    useEffect(() => {
        API.getTotalClickCount(link.shortcode)
            .then(response => {
                setTotalClickCount(response.data.clickCount);
            }, error => {
                console.log(error)
            });

        API.getClickCountByDate(link.shortcode)
            .then(response => {
                setClickCountByDate(response.data)
            }, error => {
                console.log(error);
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
            {`Total Number Of Clicks: ${totalClickCount}`}

            <LinkChart data={clickCountByDate} dateCreated={link.datecreated}/>
            
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
