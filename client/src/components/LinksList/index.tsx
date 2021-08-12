import { List } from "antd";
import CreateButton from "../CreateButton";
import { UserLink } from "../LinksDashboard/types";
import { ListWrapper, ListItemWrapper, ButtonWrapper } from './styles';

interface LinksListProps {
    userLinks: Array<UserLink>,
    currentLinkIndex: number,
    onSelectLink: (index: number) => void,
    hasNoLinks: boolean
}

const LinksList = ({
    userLinks,
    currentLinkIndex,
    onSelectLink,
    hasNoLinks
}: LinksListProps) => {

    const getShortenDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const date = dateObj.getDate();
        return month + " " + date;
    }

    return (
        <ListWrapper style={{height: 'calc(100vh - 100px)'}}>
            {
                hasNoLinks ? 
                <ButtonWrapper>
                    <CreateButton title="CREATE YOUR FIRST LINK"/>
                </ButtonWrapper>
                :
                    <List
                        size={'large'}
                        dataSource={userLinks}
                        renderItem={(item, index) => {
                            const backgroundColor = index === currentLinkIndex ? 'white' : '#f5f6f7';
                            const linkDate = getShortenDate(item.datecreated)
                            return (
                                <ListItemWrapper 
                                    style={{
                                        backgroundColor
                                    }}
                                    onClick={() => onSelectLink(index)}>

                                    <List.Item.Meta
                                        title={item.originalurl}
                                        description={item.shortUrl}
                                    />
                                    <div>{linkDate}</div>
                                </ListItemWrapper>
                            )
                        }}
                    />
            }

        </ListWrapper>
    )
};

export default LinksList;
