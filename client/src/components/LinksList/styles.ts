import styled from "styled-components";
import { List } from "antd";

export const ListWrapper = styled("div")`
    height: 100%;
    overflow: auto;
    .ant-list-split .ant-list-item {
        border-bottom: 1px solid #d8d8d8;
    }
    background: #f5f6f7;
`

export const StyledList = styled(List)`
    background: #f5f6f7;
`

export const ListItemWrapper = styled(List.Item)`
    padding-right: 24px;
    padding-left: 24px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    .ant-list-item-meta-description {
        color: rgb(255, 130, 92);
        font-size: 14px;
        line-height: 1.5715;
    }
    
`
