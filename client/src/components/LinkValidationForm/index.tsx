import { Form, Input, Space } from "antd";
import { useState } from "react";
import { Wrapper, StyledButton, Title, Subtitle } from './styles';
import { LockFilled } from "@ant-design/icons";
import Crypto from '../../util/Crypto';
import API from '../../util/API';

interface LinkValidationFormProps {
    encryption: any,
    shortcode: string
}

const LinkValidationForm = ({
    encryption,
    shortcode
}: LinkValidationFormProps) => {
    const [form] = Form.useForm();
    const [text, setText] = useState('');
    const [hasTextError, setHasTextError] = useState(false);
    const [textError, setTextError] = useState('');

    const handleTextChange = (text: string) => {
        setText(text);
        setHasTextError(false);
        setTextError('');
    };

    const handleOnButtonClick = (event: any, callback: any) => {
        event.preventDefault();
        callback();
    };

    const validatePassword = (input: string) => {
        const { cipherText, iv, salt } = encryption;

        Crypto.decrypt(input, cipherText, iv, salt)
            .then(result => {
                // redirect to original url
                API.goToOriginalUrl(shortcode)
                        .then(response => {
                            window.location = response.data.originalUrl;
                        }, error => {
                            console.log(error)
                        });
            }, error => {
                setHasTextError(true);
                setTextError('Incorrect password entered')
            })
    }

    return (
        <Wrapper>
            <Title>FriendlyLink</Title>
            <Subtitle>
                <Space size="small">
                <LockFilled/>
                Access locked link
                </Space>
            </Subtitle>
            <Form 
                form={form} 
                layout="inline" 
                onFinish={() => {}} 
                >
                <Form.Item 
                    validateStatus={hasTextError ? "error" : ""}
                    help={textError}
                    style={{
                        paddingLeft: '10%',
                        width: '70%'
                    }}
                >
                    <Input 
                        placeholder="Enter link passcode" 
                        style={{ height: '50px'}}
                        value={text}
                        type="password"
                        onChange={e => handleTextChange(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <StyledButton 
                        htmlType="submit" 
                        onClick={(e) => handleOnButtonClick(e, () => validatePassword(text))}>
                        ENTER
                    </StyledButton>
                </Form.Item>
            </Form>
    </Wrapper>
    )
}

export default LinkValidationForm;
