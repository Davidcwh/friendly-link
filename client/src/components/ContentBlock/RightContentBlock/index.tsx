import { Row, Col } from "antd";
import { SvgIcon } from "../../../common/SvgIcon";
import { Button } from "../../../common/Button";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
import { useAuth0 } from '@auth0/auth0-react';
import ShortenUrlBar from "../../ShortenUrlBar";
import {
	RightBlockContainer,
	Content,
	ContentWrapper,
	ButtonWrapper,
	ShortenBarWrapper
} from "./styles";

const RightBlock = ({
	title,
	content,
	button,
	icon,
	id,
	hasBar
}: ContentBlockProps) => {
	const { loginWithRedirect } = useAuth0();

  const scrollTo = (id: string) => {
		const element = document.getElementById(id) as HTMLDivElement;
		element.scrollIntoView({
		behavior: "smooth",
		});
  };

  return (
    <RightBlockContainer>
		<Fade direction="right">
			<Row justify="space-between" align="middle" id={id}>
			<Col lg={11} md={11} sm={11} xs={24}>
				<ContentWrapper>
				<h6>{title}</h6>
				<Content>{content}</Content>
				<ButtonWrapper>
					{typeof button === "object" &&
					button.map((item: any, id: number) => {
						const onClick = item.title === 'Get Started'
													? () => loginWithRedirect({
														screen_hint: "signup",
														appState: {
															returnTo: 'dashboard'
														}
													}) : item.title === 'Learn more'
														? () => scrollTo("feature1")
														: () => {}


						return (
						<Button
							key={id}
							color={item.color}
							fixedWidth={true}
							onClick={onClick}
							disabled={false}
						>
							{item.title}
						</Button>
						);
					})}
				</ButtonWrapper>
				</ContentWrapper>
			</Col>
			<Col lg={11} md={11} sm={12} xs={24}>
				<SvgIcon src={icon} width="100%" height="100%" />
			</Col>
			</Row>
			{hasBar !== undefined ? 
				<ShortenBarWrapper>
					<ShortenUrlBar/>
				</ShortenBarWrapper>: <div/>}
		</Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;
