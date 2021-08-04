import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper } from './styles';
import LinkInfoBlock from '../LinkInfoBlock';

interface LinkInfoProps {
    userLink: UserLink
}

const LinkInfo = ({
    userLink
}: LinkInfoProps) => {
    return (
        <InfoWrapper>
            {userLink !== undefined && <LinkInfoBlock userLink={userLink}/>}
        </InfoWrapper>
    )
}

export default LinkInfo;
