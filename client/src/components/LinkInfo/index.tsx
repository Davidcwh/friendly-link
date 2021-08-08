import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper, EmptyWrapper } from './styles';
import LinkInfoBlock from '../LinkInfoBlock';
import LinkInfoChart from "../LinkInfoChart";
import { Fade } from 'react-awesome-reveal';
import { Empty, Space } from "antd";
import CreateButton from '../CreateButton';

interface LinkInfoProps {
    userLink: UserLink,
    hasNoLinks: boolean
}

const LinkInfo = ({
    userLink,
    hasNoLinks
}: LinkInfoProps) => {

    return (
        <InfoWrapper style={{height: 'calc(100vh - 90px)'}}>
            {
                hasNoLinks ? 
                    <EmptyWrapper>
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <>
                                    <Space size='large' direction='vertical'>
                                        <span>
                                            Seems to be empty here
                                        </span>
                                        <CreateButton title="CREATE YOUR FIRST LINK"/>
                                    </Space>
                                </>
                            }
                        /> 
                    </EmptyWrapper>
                    :
                    <Fade direction="right" duration={800} damping={0.2} cascade>
                        <LinkInfoBlock userLink={userLink}/>
                        <LinkInfoChart userLink={userLink}/>
                    </Fade>
            }
        </InfoWrapper>
    )
}

export default LinkInfo;
