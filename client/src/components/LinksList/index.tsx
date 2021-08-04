import { List } from "antd";
import { UserLink } from "../LinksDashboard/types";
import { ListWrapper, ListItemWrapper } from './styles';

interface LinksListProps {
    userLinks: Array<UserLink>,
    currentLinkIndex: number,
    onSelectLink: (index: number) => void
}

const LinksList = ({
    userLinks,
    currentLinkIndex,
    onSelectLink
}: LinksListProps) => {

    const getShortenDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const date = dateObj.getDate();
        return month + " " + date;
    }


    return (
        <ListWrapper>
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
            >

            </List>
        </ListWrapper>
    )
};

export default LinksList;
