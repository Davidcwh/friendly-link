import styled from "styled-components";
import { Row, Col } from "antd";

export const DashboardWrapper = styled(Row)`
    flex: 1;
    border: 1px solid #e8e8e8;
    // border: 10px solid blue;
    border-radius: 4px;
`

export const DashboardWrapper1 = styled("div")`
    flex: 1;
    // border: 1px solid #e8e8e8;
    border: 1px solid red;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
`
export const LinksListWrapper = styled("div")`
    width: 25%;
`

export const LinkInfoWrapper = styled("div")`
    width: 75%;
    overflow: scroll;
`

export const StyledCol = styled(Col)`
    height: 100%;
    overflow: scroll;
`