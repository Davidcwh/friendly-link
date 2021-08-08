import styled from "styled-components";
import { List } from "antd";

export const ListWrapper = styled("div")<any>`
    overflow-y: auto;
    background: #f5f6f7;

    .ant-list-split .ant-list-item {
        border-bottom: 1px solid #d8d8d8;
    }

    .ant-list-item-meta-title {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 1.5715;
        text-overflow: ellipsis;
        overflow: hidden; 
    }
    
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
        text-overflow: ellipsis;
        overflow: hidden; 
    }
    
`
