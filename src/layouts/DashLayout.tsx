import React, {useState, FC} from 'react';
import {useDispatch} from "react-redux";
import {Layout, Menu, Button} from 'antd';
import {Link} from "react-router-dom";
import Logo from "../images/logo.png";
import {LogoutOutlined, DashboardOutlined} from "@ant-design/icons/lib/icons";
import {logoutUser} from "../redux/actions/usersActions";

const {Header, Content, Sider} = Layout;

const DashLayout: FC = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logoutUser());
    };
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={280}>
                <div className="logo">
                    <Link to={'/admin'}>
                        <img src={Logo} alt="logo"/>
                    </Link>
                </div>
                <Menu
                    theme={'dark'}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{height: '100%'}}
                >
                    <Menu.Item key={'1'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/dashboard'}>
                            Дэшборд
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'2'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/recipes'}>
                            Рецепты
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'3'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/ingredients'}>
                            Ингредиенты
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'4'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/categories'}>
                            Категории
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'5'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/comments'}>
                            Комментарии
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'6'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/tags'}>
                            Тэги
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'7'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/users'}>
                            Пользователи
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={'8'} icon={<DashboardOutlined/>}>
                        <Link to={'/admin/roles'}>
                            Роли
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background"
                        style={{padding: 0, paddingRight: 24, display: 'flex', justifyContent: 'flex-end'}}>
                    <div className="logout">
                        <Button type="primary" icon={<LogoutOutlined/>} onClick={() => {
                            logOut();
                        }}>
                            Выйти
                        </Button>
                    </div>
                </Header>
                <Content>
                    <div style={{padding: 24, minHeight: 360}}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashLayout;
