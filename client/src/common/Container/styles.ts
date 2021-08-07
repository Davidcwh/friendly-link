import styled from "styled-components";

export const StyledContainer = styled("div")<any>`
    position: relative;
    width: 100%;
    max-width: ${props => props.isAuthenticated ? '100%' : '1200px'};
    margin-right: ${props => props.isAuthenticated ? '0' : 'auto'};
    margin-left: ${props => props.isAuthenticated ? '0' : 'auto'};
    padding: 0 ${props => props.isAuthenticated ? '30px' : '60px'};
    border-top: ${(props) => (props.border ? "1px solid #CDD1D4" : "")};
    @media only screen and (max-width: 1024px) {
      max-width: calc(100% - 68px);
      padding: 0 30px;
    }
    @media only screen and (max-width: 768px) {
      max-width: calc(100% - 38px);
      padding: 0 18px;
    }
    @media only screen and (max-width: 414px) {
      max-width: 100%;
      padding: 0 18px;
    }
`;