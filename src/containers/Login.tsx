import React, {FC, useEffect} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Logo from '../images/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../redux/actions/usersActions";
import {IRootState} from '../redux/store';

interface onFinish {
    userName: string,
    password: string
}

const Login: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector<IRootState>(state => state.currentUser);
    const isLoading = useSelector<IRootState, boolean>(state => state.currentUser.isLoading);

    const onFinish = (values: onFinish) => {
        dispatch(loginUser(values));
    };
    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])
    return (
        <>
            <div className="login-logo">
                <img src={Logo} alt="logo"/>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                    email: "asone7776@gmail.com",
                    password: '123456'
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите ваш email',
                        },
                        {
                            type: 'email',
                            message: 'Email не корректный',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Логин"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите ваш пароль',
                        },
                        {
                            max: 6,
                            message: 'Максимальная длина 6 символов',
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block loading={isLoading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Login;
