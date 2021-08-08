import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper } from './styles';
import LinkInfoBlock from '../LinkInfoBlock';
import LinkInfoChart from "../LinkInfoChart";
import { Fade } from 'react-awesome-reveal';

interface LinkInfoProps {
    userLink: UserLink
}

const LinkInfo = ({
    userLink
}: LinkInfoProps) => {
    return (
        <InfoWrapper style={{height: 'calc(100vh - 90px)'}}>
            <Fade direction="right" duration={800} damping={0.2} cascade>
                <LinkInfoBlock userLink={userLink}/>
                <LinkInfoChart userLink={userLink}/>
            </Fade>
        </InfoWrapper>
    )
}

export default LinkInfo;
