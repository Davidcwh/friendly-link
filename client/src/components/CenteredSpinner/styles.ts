import styled from "styled-components";
import { Spin } from 'antd'

export const SpinnerWrapper = styled("div")`
    position: absolute;
    left: 50%;
    top: 50%;
`;

export const CustomSpinner = styled(Spin)`
    .ant-spin-dot-item {
        background-color: #2e186a;
    }
`
