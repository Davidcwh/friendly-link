import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import { StyledDiv, LeftIconWrapper, RightIconWrapper } from './styles';

interface UserMenuProps {
    userTitle: string
}

const UserMenu = ({
    userTitle
}: UserMenuProps) => {
    const { logout } = useAuth0();

    const menu = (
        <Menu>
          <Menu.Item 
            key="1" 
            onClick={() => logout({
					returnTo: window.location.origin
				})}
            icon={<LogoutOutlined/>} 
            >
            Logout
          </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <StyledDiv>
                <Space align="center">
                    <LeftIconWrapper>
                        <UserOutlined style={{ fontSize: '24px'}}/>
                    </LeftIconWrapper>
                    
                    {userTitle}

                    <RightIconWrapper>
                        <DownOutlined style={{ fontSize: '16px'}}/>
                    </RightIconWrapper>
                </Space>
            </StyledDiv>
        </Dropdown>
    )
};

export default UserMenu;
