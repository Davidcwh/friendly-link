import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper } from './styles';
import LinkInfoBlock from '../LinkInfoBlock';
import { Fade } from 'react-awesome-reveal';

interface LinkInfoProps {
    userLink: UserLink
}

const LinkInfo = ({
    userLink
}: LinkInfoProps) => {
    return (
        <InfoWrapper>
            <Fade direction="right" duration={800} damping={0.2} cascade>
                <LinkInfoBlock userLink={userLink}/>
                <div>hello</div>
            </Fade>
        </InfoWrapper>
    )
}

export default LinkInfo;
