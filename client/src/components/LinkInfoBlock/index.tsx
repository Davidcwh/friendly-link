import { useState, useEffect } from 'react';
import { UserLink } from '../LinksDashboard/types';
import { Row, Col } from 'antd';
import { 
    OriginalLinkTitle,
    OriginalLinkSubTitle,
    ShortenLink,
    StyledRow,
    StyledButton,
    StyledDivider
 } from './styles';

interface LinkInfoBlockProps {
    userLink: UserLink
}

const LinkInfoBlock = ({
    userLink
}: LinkInfoBlockProps) => {
    const [isShortUrlBlinking, setIsShortUrlBlinking] = useState(false);

    const getShortenDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();
        return month + " " + date + ", " + year;
    }

    const getFormattedUrl = () => {
        return userLink.hasprotocol ? userLink.originalurl : "//" + userLink.originalurl;
    }

    const onCopyButtonClick = () => {
        navigator.clipboard.writeText(userLink.shortUrl).then(function() {
            setIsShortUrlBlinking(true);
        }, function(err) {
            console.error('Async: Could not copy short url: ', err);
        });
    }

    useEffect(() => {
        if(isShortUrlBlinking) {
            const timer = setTimeout(() => {
                setIsShortUrlBlinking(false);
            }, 500);

            return () => {
                clearTimeout(timer);
            } 
        }
    }, [isShortUrlBlinking]);

    return (
        <>
            <Row>
                <div>{`CREATED ${getShortenDate(userLink.datecreated)}`}</div>
            </Row>

            <Row>
                <Col>
                    <Row>
                        <OriginalLinkTitle>{userLink.originalurl}</OriginalLinkTitle>
                    </Row>
                    <StyledRow spacing="5px">
                        <OriginalLinkSubTitle href={getFormattedUrl()} target="_blank" rel="noopener" >{userLink.originalurl}</OriginalLinkSubTitle>
                    </StyledRow>
                </Col>
            </Row>

            <StyledRow>
                <Col>
                    <ShortenLink blink={isShortUrlBlinking} href={userLink.shortUrl} target="_blank" rel="noopener">{userLink.shortUrl}</ShortenLink>
                </Col>
                <Col>
                    <StyledButton onClick={onCopyButtonClick}>COPY</StyledButton>
                </Col>
            </StyledRow>
            <StyledDivider/>
        </>
    )
}

export default LinkInfoBlock;
