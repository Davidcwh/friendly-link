import { useEffect, useState } from 'react'
import { UserLink } from './types'
import LinksList from '../LinksList'
import LinkInfo from '../LinkInfo'
import { DashboardWrapper, StyledRow, StyledCol } from './styles';
import CenteredSpinner from '../CenteredSpinner';

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

    const hasNoLinks = !isLoading && userLinks.length === 0;

    return (
        <DashboardWrapper>
            <StyledRow>
                <StyledCol xs={10} sm={10} md={10} lg={10} xl={6} xxl={6}>
                    <LinksList 
                        hasNoLinks={hasNoLinks}
                        userLinks={userLinks}
                        currentLinkIndex={currentLinkIndex}
                        onSelectLink={(index: number) => {
                            setCurrentLinkIndex(index);
                            setIsInfoHidden(true);
                        }}
                    />
                </StyledCol>            
                <StyledCol xs={14} sm={14} md={14} lg={14} xl={18} xxl={18}>
                    {
                        (isInfoHidden) ? <div></div>: 
                        <LinkInfo
                            userLink={userLinks[currentLinkIndex]}
                            hasNoLinks={hasNoLinks}
                        />
                    }
                </StyledCol>
            </StyledRow>
        </DashboardWrapper>
    )
}

export default LinksDashboard;
