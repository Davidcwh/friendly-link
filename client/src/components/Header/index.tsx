import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
import { Button } from "../../common/Button";
import { useAuth0 } from '@auth0/auth0-react';
import UserMenu from "../UserMenu";
import CreateButton from "../CreateButton";
import {
    HeaderSection,
    LogoContainer,
	Logo,
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
	const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
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
			<CustomNavLinkSmall onClick={() => scrollTo("intro2")}>
				<Span>{"About"}</Span>
			</CustomNavLinkSmall>
			<CustomNavLinkSmall onClick={() => scrollTo("Contact")}>
				<Span>{"Contact"}</Span>
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
				<Button disabled={false}>{"Signup"}</Button>
				</Span>
			</CustomNavLinkSmall>
			</>
		);
    };

	const UserDashboardPageMenuItem = () => {
		return (
			<>
				<CreateButton title="CREATE"/>
				<UserMenu userTitle={email === undefined ? 'Your account' : email}/>
			</>
		)
	}

	const MenuItem = () => {
		if(isAuthenticated) {
			return <UserDashboardPageMenuItem/>
		} else {
			return <LandingPageMenuItem />
		}
	}

	const DrawerItem = () => {
		if(isAuthenticated) {
			return (
				<>
				<CreateButton title="CREATE"/>
				<CustomNavLinkSmall onClick={() => logout({
					returnTo: window.location.origin
				})}>
					<Span>{"Logout"}</Span>
				</CustomNavLinkSmall>
				</>
			)
		} else {
			return <LandingPageMenuItem />
		}
	}
  
    return (
		<HeaderSection>
			<Container>
			<Row justify="space-between">
				{
					isAuthenticated ? <Logo>FriendlyLink</Logo> :
					<LogoContainer to="/" aria-label="homepage">
						<Logo>FriendlyLink</Logo>
					</LogoContainer>
				}

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
				<DrawerItem />
			</Drawer>
			</Container>
		</HeaderSection>
    );
  };
  
export default Header;
