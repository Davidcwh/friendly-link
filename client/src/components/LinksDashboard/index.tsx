import { useEffect, useState } from 'react'
import { UserLink } from './types'
import { Space, Row, Col } from 'antd'
import LinksList from '../LinksList'
import LinkInfo from '../LinkInfo'
import { DashboardWrapper, StyledRow, StyledCol } from './styles';
import CenteredSpinner from '../CenteredSpinner';
import { rxjsService } from '../../util/RxjsService';

interface LinksDashboardProps {
    userLinks: Array<UserLink>,
    isLoading: boolean
};

const LinksDashboard = ({
    userLinks,
    isLoading
}: LinksDashboardProps) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
    const [isInfoHidden, setIsInfoHidden] = useState(false);

    // So that link info will slide in with every click
    useEffect(() => {
        if(isInfoHidden) {
            const timer = setTimeout(() => {
                setIsInfoHidden(false);
            }, 1);

            return () => {
                clearTimeout(timer);
            } 
        }
    }, [isInfoHidden]);

    if(isLoading) {
        return <CenteredSpinner/>
    }

    return (
        <DashboardWrapper>
        <StyledRow>
            <StyledCol span={6}>
                <LinksList 
                    userLinks={userLinks}
                    currentLinkIndex={currentLinkIndex}
                    onSelectLink={(index: number) => {
                        setCurrentLinkIndex(index);
                        setIsInfoHidden(true);
                    }}
                />
            </StyledCol>            
            <StyledCol span={18}>
                {
                    (isInfoHidden || userLinks[currentLinkIndex] === undefined) ? <div></div>: 
                    <LinkInfo
                        userLink={userLinks[currentLinkIndex]}
                    />
                }
            </StyledCol>
        </StyledRow>
        </DashboardWrapper>
    )
}

export default LinksDashboard;
