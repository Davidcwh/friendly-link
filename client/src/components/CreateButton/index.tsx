import { useAuth0 } from "@auth0/auth0-react";
import { Form, Input } from "antd";
import { useState } from "react";
import { StyledButton, DrawerWrapper, SumbitButton } from "./styles";
import Crypto from "../../util/Crypto";
import API from "../../util/API";
import { InfoCircleOutlined, LockFilled } from "@ant-design/icons";
import { rxjsService } from "../../util/RxjsService";

interface CreateButtonProps {
    title: string
}

const CreateButton = ({
    title
}: CreateButtonProps) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const [text, setText] = useState('');
    const [hasTextError, setHasTextError] = useState(false);
    const [textError, setTextError] = useState('');

    const [password, setPassword] = useState('');
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    
    const { isAuthenticated, user } = useAuth0();

    const createShortUrl = async (url: string) => {
        if(text === '') {
            return;
        }

        const userId = isAuthenticated && user !== undefined ? user.sub : null;

        let encryption = null;
        if(isAuthenticated && password !== '') {
            encryption = await Crypto.encrypt(password)
                                    .catch(error => {
                                        setHasPasswordError(true);
                                        setPasswordError('Error encrypting that password, try another password');
                                        return;
                                    });
        }

        API.createShortUrl(url, userId, encryption)
            .then(response => {
                rxjsService.sendLoad(true);
                onClose();
            }, error => {
                const errorReason = error.response ? error.response.data : '';
                setHasTextError(true);
                setTextError(`Unable to shorten that link. ${errorReason}`);
            });
    };

    const handleTextChange = (text: string) => {
        setText(text);
        setHasTextError(false);
        setTextError('');
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setHasPasswordError(false);
        setPasswordError('');
    };

    const handleOnButtonClick = (event: any, callback: () => void) => {
        event.preventDefault();
        callback();
    };

    const onClose = () => {
        setText('');
        setHasTextError(false);
        setTextError('');

        setPassword('');
        setHasPasswordError(false);
        setPasswordError('');

        setVisible(false);
    }

    const handleKeypress = (e: any) => {
        //it triggers by pressing the enter key
        const code = e.keyCode || e.which;
        if (code === 13 && text !== '') {
            handleOnButtonClick(e, () => createShortUrl(text))
        }
    };

    return (
        <>
            <StyledButton onClick={() => setVisible(true)}>
                {title}
            </StyledButton>


            <DrawerWrapper
                title="CREATE LINK"
                placement="right"
                onClose={onClose}
                visible={visible}
                footer={
                    <SumbitButton 
                        onClick={(e: any) => handleOnButtonClick(e, () => createShortUrl(text))}
                        disabled={text === ''}
                    >
                        CREATE
                    </SumbitButton>
                  }
            >
                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={() => {}} 
                 >
                    <Form.Item 
                        validateStatus={hasTextError ? "error" : ""}
                        help={textError}
                    >
                        <Input 
                            placeholder="Paste long URL" 
                            style={{ height: '50px'}}
                            value={text}
                            onChange={e => handleTextChange(e.target.value)}
                            onKeyPress={handleKeypress}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Lock link (Optional)"
                        tooltip={{ title: 'Leave blank for unlocked link', icon: <InfoCircleOutlined /> }}
                        validateStatus={hasPasswordError ? "error" : ""}
                        help={passwordError}
                    >
                        <Input 
                            prefix={<LockFilled className="site-form-item-icon" />}
                            placeholder="Set password" 
                            type="password"
                            value={password}
                            onChange={e => handlePasswordChange(e.target.value)}
                            onKeyPress={handleKeypress}
                        />
                    </Form.Item>
                </Form>
            </DrawerWrapper>
        </>
    )
};

export default CreateButton;
