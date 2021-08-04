import { useState } from 'react'
import { UserLink } from './types'
import { Space, Row, Col } from 'antd'
import LinksList from '../LinksList'
import LinkInfo from '../LinkInfo'
import { DashboardWrapper } from './styles'

interface LinksDashboardProps {
    userLinks: Array<UserLink>
};

const LinksDashboard = ({
    userLinks
}: LinksDashboardProps) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    return (
        <DashboardWrapper>
            <Col span={6}>
                <LinksList 
                    userLinks={userLinks}
                    currentLinkIndex={currentLinkIndex}
                    onSelectLink={(index: number) => setCurrentLinkIndex(index)}
                />
            </Col>

            <Col span={18}>
                <LinkInfo
                    userLink={userLinks[currentLinkIndex]}
                />
            </Col>
        </DashboardWrapper>
    )
}

export default LinksDashboard;
