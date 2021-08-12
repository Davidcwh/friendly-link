import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper, EmptyWrapper, StyledDrawer } from './styles';
import LinkInfoBlock from '../LinkInfoBlock';
import LinkInfoChart from "../LinkInfoChart";
import { Fade } from 'react-awesome-reveal';
import { Empty, Space } from "antd";
import { useState } from "react";

interface LinkInfoProps {
    userLink: UserLink,
    hasNoLinks: boolean
}

const LinkInfo = ({
    userLink,
    hasNoLinks
}: LinkInfoProps) => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(true);

    return (
        <>
            <InfoWrapper style={{
                height: 'calc(100vh - 100px)'
            }}>
                {
                    hasNoLinks ? 
                        <EmptyWrapper className="emptyMessage">
                            <Empty 
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <>
                                        <Space size='large' direction='vertical'>
                                            <span>
                                                No Link Selected
                                            </span>
                                        </Space>
                                    </>
                                }
                            /> 
                        </EmptyWrapper>
                        :
                        <Fade className="bigInfo" direction="right" duration={800} damping={0.2} cascade>
                            <LinkInfoBlock userLink={userLink}/>
                            <LinkInfoChart userLink={userLink}/>
                        </Fade>
                }
                {!hasNoLinks && <StyledDrawer
                    title="LINK INFO"
                    placement="right"
                    width={640}
                    onClose={() => setIsDrawerVisible(false)}
                    visible={isDrawerVisible}
                >
                    <LinkInfoBlock userLink={userLink}/>
                    <LinkInfoChart userLink={userLink}/>
                </StyledDrawer>}
            </InfoWrapper>
            
        </>
    )
}

export default LinkInfo;
