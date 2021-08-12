import { Row, Col } from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import {
    FooterSection,
    IconWrapper,
    Para,
    FooterContainer,
    Language
  } from "./styles";

interface SocialLinkProps {
    href: string;
    src: string;
}

const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
        <IconWrapper
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            key={src}
            aria-label={src}
        >
            <SvgIcon src={src} width="25px" height="25px" />
        </IconWrapper>
    );
};

const Footer = () => {

    return (
        <FooterSection>
            <Container>
                <Row 
                    justify="start" 
                    align="top"
                    id="Contact"
                >
                    <Language>
                        Contact
                    </Language>
                    
                </Row>
                <Row>
                    <Col span={2}>
                        <FooterContainer>
                            <SocialLink
                                href="https://github.com/Davidcwh/friendly-link"
                                src="github.svg"
                            />
                            <SocialLink
                                href="https://www.linkedin.com/in/david-chia-4b854a191/"
                                src="linkedin.svg"
                            />    
                        </FooterContainer>
                    </Col>
                </Row>
                <Row>
                    <Para>
                        Created By David Chia, © 2021
                    </Para>
                </Row>
            </Container>
        </FooterSection>
    )
};

export default Footer;
