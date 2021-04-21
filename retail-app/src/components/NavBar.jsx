import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
  BarcodeOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/NavBar.css';

function NavBar({ setView, viewSelect }) {
  const [collapsed, setCollapse] = useState(false);
  const { Sider } = Layout;
  const handleView = ({ key }) => {
    setView(key);
  };
  const { logout } = useAuth0();
  const onCollapse = (collapsed) => setCollapse(collapsed);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={viewSelect}
        onClick={handleView}
      >
        <Menu.Item icon={<UserOutlined />} key='1'>
          <Link to='/users'>Users</Link>
        </Menu.Item>
        <Menu.Item icon={<ShoppingCartOutlined />} key='2'>
          <Link to='/address'>Addresses</Link>
        </Menu.Item>
        <Menu.Item icon={<BarcodeOutlined />} key='3'>
          <Link to='/orders'>Orders</Link>
        </Menu.Item>
        <Menu.Item icon={<DollarCircleOutlined />} key='4'>
          <Link to='/payments'>Payments</Link>
        </Menu.Item>
        <Menu.Item icon={<SearchOutlined />} key='5'>
          <Link to='/search'>Search</Link>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} key='6'>
          <Link onClick={() => logout()}>Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default NavBar;
