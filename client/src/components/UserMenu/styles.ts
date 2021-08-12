import styled from "styled-components";

export const StyledDiv = styled("div")<any>`
    background: #2e186a;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    width: 100%;
    border: 1px solid #edf3f5;
    border-radius: 4px;
    padding: 13px 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    // box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
    &:hover,
    &:active,
    &:focus {
        color: #fff;
        background-color: #6c5d96;
    }
`;

export const LeftIconWrapper = styled("div")`
    margin-left: 10px;
`;

export const RightIconWrapper = styled("div")`
    margin: 0 10px;
`;
