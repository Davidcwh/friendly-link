export interface ContainerProps {
    border?: boolean;
    children: React.ReactNode;
}

export interface SvgIconProps {
    src: string;
    width: string;
    height: string;
}

export interface ButtonProps {
    color?: string;
    fixedWidth?: boolean;
    name?: string;
    children: React.ReactNode;
    onClick?: (e?: any) => void;
}