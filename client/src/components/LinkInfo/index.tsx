import { UserLink } from "../LinksDashboard/types";
import { InfoWrapper } from './styles';

interface LinkInfoProps {
    userLink: UserLink
}

const LinkInfo = ({
    userLink
}: LinkInfoProps) => {
    return (
        <InfoWrapper>
            <h1>
                {userLink && userLink.originalurl}
            </h1>
            <br/>
            <div>
                {userLink && userLink.shortUrl}
            </div>
        </InfoWrapper>
    )
}

export default LinkInfo;
