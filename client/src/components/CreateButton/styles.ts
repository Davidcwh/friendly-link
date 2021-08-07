import styled from "styled-components";
import { Drawer } from "antd";

export const StyledButton = styled("div")<any>`
    text-align: center;
    background: rgb(255, 130, 92);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    width: 100%;
    border: 1px solid #edf3f5;
    border-radius: 4px;
    padding: 13px 26px;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:active,
    &:focus {
        color: #fff;
        background-color: #ffa78c;
    }
`;

export const DrawerWrapper = styled(Drawer)<any>`
    .ant-drawer-title {
        margin: 0;
        color: #2e186a;
        font-family: 'Motiva Sans Bold', serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
    }

    // .ant-drawer-header {
    //     position: relative;
    //     padding: 16px 24px;
    //     color: rgba(0, 0, 0, 0.85);
    //     background: #2e186a;
    //     border-bottom: 1px solid #f0f0f0;
    //     border-radius: 2px 2px 0 0;
    // }
    .ant-drawer-close {
        color: #2e186a;
    }
`

export const SumbitButton = styled("div")<any>`
    text-align: center;
    background: ${props => props.disabled ? '#f5f5f5' : 'rgb(255, 130, 92)'};
    color: ${props => props.disabled ? '#b8b8b8' : '#fff'};
    font-size: 1rem;
    font-weight: 700;
    width: 100%;
    border: 1px solid #edf3f5;
    border-radius: 4px;
    padding: 13px 26px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease-in-out;
    &:hover,
    &:active,
    &:focus {
        color: ${props => props.disabled ? '#b8b8b8' : '#fff'};
        background-color: ${props => props.disabled ? '#f5f5f5' : '#ffa78c'};
    }
`;
