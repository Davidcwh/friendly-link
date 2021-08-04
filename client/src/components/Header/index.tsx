import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import { useAuth0 } from '@auth0/auth0-react';
import UserMenu from "../UserMenu";
import {
    HeaderSection,
    LogoContainer,
    Burger,
    NotHidden,
    Menu,
    CustomNavLinkSmall,
    Label,
    Outline,
    Span,
} from "./styles";

const Header = () => {
    const [visible, setVisibility] = useState(false);
	const { loginWithRedirect, isAuthenticated, isLoading, user, logout } = useAuth0();
	const email = isAuthenticated && user !== undefined ? user.email : '';
  
    const showDrawer = () => {
    	setVisibility(!visible);
    };
  
    const onClose = () => {
      	setVisibility(!visible);
    };

	const scrollTo = (id: string) => {
		const element = document.getElementById(id) as HTMLDivElement;
		element.scrollIntoView({
		behavior: "smooth",
		});
		setVisibility(false);
	};
  
    const LandingPageMenuItem = () => {

		return (
			<>
			<CustomNavLinkSmall onClick={() => scrollTo("feature1")}>
				<Span>{"About"}</Span>
			</CustomNavLinkSmall>
			<CustomNavLinkSmall onClick={() => scrollTo("feature1")}>
				<Span>{"Features"}</Span>
			</CustomNavLinkSmall>
			<CustomNavLinkSmall onClick={() => loginWithRedirect({
                appState: {
                    returnTo: 'dashboard'
                }
            })}>
				<Span>{"Login"}</Span>
			</CustomNavLinkSmall>
			<CustomNavLinkSmall
				style={{ width: "180px" }}
				onClick={() => loginWithRedirect({
					screen_hint: "signup",
					appState: {
						returnTo: 'dashboard'
					}
				})}
			>
				<Span>
				<Button>{"Signup"}</Button>
				</Span>
			</CustomNavLinkSmall>
			</>
		);
    };

	const MenuItem = () => {
		if(isAuthenticated) {
			return <UserMenu userTitle={email === undefined ? 'Your account' : email}/>
		} else {
			return <LandingPageMenuItem />
		}
	}
  
    return (
		<HeaderSection>
			<Container>
			<Row justify="space-between">
				<LogoContainer to="/" aria-label="homepage">
				<SvgIcon src="logo.001.jpeg" width="200px" height="45px" />
				</LogoContainer>
				<NotHidden>
				<MenuItem/>
				</NotHidden>
				<Burger onClick={showDrawer}>
				<Outline />
				</Burger>
			</Row>
			<Drawer closable={false} visible={visible} onClose={onClose}>
				<Col style={{ marginBottom: "2.5rem" }}>
				<Label onClick={onClose}>
					<Col span={12}>
					<Menu>Menu</Menu>
					</Col>
					<Col span={12}>
					<Outline />
					</Col>
				</Label>
				</Col>
				<MenuItem />
			</Drawer>
			</Container>
		</HeaderSection>
    );
  };
  
export default Header;
