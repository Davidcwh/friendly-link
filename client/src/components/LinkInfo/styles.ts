import styled from "styled-components";
import { Drawer } from "antd";

export const InfoWrapper = styled("div")`
    padding: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    
    @media screen and (min-width: 0px) and (max-width: 500px) {
        .bigInfo { display: none; } 

        .emptyMessage { display: none; } 
    }
`

export const EmptyWrapper = styled("div")`
    padding: 10% 20%;
`

export const StyledDrawer = styled(Drawer)`

    @media screen and (min-width: 712px) {
        display: none;
    }

    .ant-drawer-title {
        margin: 0;
        color: #2e186a;
        font-family: 'Motiva Sans Bold', serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
    }

    .ant-drawer-content-wrapper {
        width: 100% !important;
        max-width: 500px;
    }

    .ant-drawer-close {
        color: #2e186a;
    }
`
