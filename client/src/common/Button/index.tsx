import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({
    color,
    fixedWidth,
    children,
    onClick,
    disabled
}: ButtonProps) => (
    <StyledButton color={color} fixedWidth={fixedWidth} onClick={onClick} disabled={disabled}>
        {children}
    </StyledButton>
);