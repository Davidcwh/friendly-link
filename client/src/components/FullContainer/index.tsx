import { ReactNode } from 'react';
import { FullContainerStyled } from './styles';

interface FullContainerProps {
    children: ReactNode
}

const FullContainer = ({ children }: FullContainerProps) => {
    return ( 
        <FullContainerStyled>
            {children}
        </FullContainerStyled>
    )
}

export default FullContainer;