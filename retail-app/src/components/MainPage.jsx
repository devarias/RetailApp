import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import NavBar from './NavBar';
import Welcome from './Welcome';
import User from './User';
import Order from './Order';
import Address from './Address';
import Payment from './Payment';
import Search from './Search';
import '../styles/MainPage.css';

const { Header, Content, Footer } = Layout;

function MainPage() {
  const [view, setView] = useState(0);
  const styling = {
    layout: { labelCol: { span: 7 }, wrapperCol: { span: 10 } },
    tailLayout: { wrapperCol: { offset: 10, span: 16 } },
    req: {
      required: true,
      tooltip: {
        title: 'This is a required field',
        icon: <InfoCircleOutlined />,
      },
    },
  };
  const pageName = [
    'Home',
    'Create an User',
    'Add an Address',
    'Create an Order',
    'Create a Payment',
    'Search',
  ];
  const pathRoute = [
    '/',
    '/users',
    '/address',
    '/orders',
    '/payments',
    '/search',
  ];
  const viewObjects = [
    <Welcome />,
    <User styling={styling} />,
    <Address styling={styling} />,
    <Order styling={styling} />,
    <Payment styling={styling} />,
    <Search styling={styling} />,
  ];

  return (
    <Router>
      <Switch>
        <Layout className='lay'>
          <NavBar setView={setView} />
          <Layout className='site-layout'>
            <Header className='site-layout-background header-container'>
              {pageName[view]}
            </Header>
            <Content className='top'>
              <div className='space' />
              <div className='site-layout-background container'>
                <Route path={pathRoute[view]}>{viewObjects[view]}</Route>
              </div>
            </Content>
            <Footer>Made by David Arias</Footer>
          </Layout>
        </Layout>
      </Switch>
    </Router>
  );
}

export default MainPage;
