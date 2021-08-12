import styled from "styled-components";

export const FooterSection = styled("footer")`
    background: rgb(241, 242, 243);
    padding: 2.5rem 0;
`;

export const Language = styled("h4")`
    font-size: 22px;
    text-transform: capitalize;
    color: #18216d;
    @media screen and (max-width: 414px) {
        padding: 1.5rem 0;
    }
`;

export const Para = styled("div")`
    color: #18216d;
    font-size: 14px;
    width: 70%;
    margin-top: 10px;
`;

export const FooterContainer = styled("div")`
    max-width: 510px;
    width: 100%;
    display: flex;
    // justify-content: space-between;
    text-align: center;
    align-items: center;
    transition: all 0.1s ease-in-out;
    a {
        &:hover,
        &:active,
        &:focus {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
        }
    }

    div {
        cursor: pointer;
        margin-right: 15px;
        width: 25px;
        height: 25px;
        &:hover {
        fill: rgb(255, 130, 92);
        }
    }
`;

export const IconWrapper = styled("a")`
    margin-right: 10px;
`;