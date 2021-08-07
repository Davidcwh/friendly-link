import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";
import { useAuth0 } from '@auth0/auth0-react';

const Container = ({
    border,
    children,
}: ContainerProps) => {
    const { isAuthenticated } = useAuth0();

    return (
        <StyledContainer border={border} isAuthenticated={isAuthenticated}>
            {children}
        </StyledContainer>
    )
    
}

export default Container;
