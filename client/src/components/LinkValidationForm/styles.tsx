import styled from "styled-components";
import { Button } from 'antd'

export const Wrapper = styled("div")`
    // position: absolute;
    padding: 15% 25%;

    .ant-btn {
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 700;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
        height: 50px;
        padding: 4px 15px;
        font-size: 14px;
        color: #fff;;
        background: rgb(255, 130, 92);
        border: 1px solid #edf3f5;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;
        &:hover,
        &:active,
        &:focus {
            color: #fff;
            background-color: #ffa78c;
        }
    }

    @media screen and (max-width: 712px) {
        .ant-form-item {
            padding-left: 10%;
        }
    }
`

export const Title = styled("h1")`
    text-align: center;
`

export const Subtitle = styled("div")`
    padding-left: 10%;
    margin-bottom: 5px;
`

export const StyledButton = styled(Button)`
    
`
