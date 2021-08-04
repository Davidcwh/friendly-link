import styled from "styled-components";
import { Row } from 'antd';

export const OriginalLinkTitle = styled("div")`
    font-family: 'Motiva Sans Light', serif;
    color: #18216d;
    font-size: 47px;
    line-height: 1.18;
`

export const OriginalLinkSubTitle = styled("a")`
    // cursor: pointer;
`

export const ShortenLink = styled("a")<any>`
    color: rgb(255, 130, 92);
    font-weight: bolder;
    &:hover,
    &:active,
    &:focus {
        color: rgb(255, 130, 92);
    }
    
    ${props => props.blink && `
    animation: blinker 0.5s linear infinite;

      
    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
    `}
`

export const StyledButton = styled("button")<any>`
    color: rgb(255, 130, 92);
    background: white;
    border: 1px solid rgb(255, 130, 92);
    border-radius: 4px;
    padding: 0 16px;
    margin-left: 12px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:active {
        color: white;
        border: 1px solid rgb(255, 130, 92);
        background-color: rgb(255, 130, 92);
    }
`;

export const StyledRow = styled(Row)<any>`
    margin: ${props => props.spacing || "24px"} 0;
`
