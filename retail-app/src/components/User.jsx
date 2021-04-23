import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createUser } from '../Requests';
import Reset from './Reset';

function User(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [govId, setGovId] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState(false);
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const { styling } = props;
  const { layout, req } = styling;
  const { labelCol, wrapperCol } = layout;
  const { required, tooltip } = req;
  const sendUser = () => {
    createUser(firstName, lastName, govId, email, company);
    form.resetFields();
  };
  useEffect(() => {
    if (firstName && lastName && govId) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [firstName, lastName, govId]);

  const sending = () => {
    confirm({
      title: 'Confirm Data',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          First Name: {firstName}
          <br />
          Last Name: {lastName}
          <br />
          Government ID: {govId}
          <br />
          Email: {email ? email : 'None'}
          <br />
          Company: {company ? email : 'None'}
          <br />
        </div>
      ),
      onOk() {
        setTimeout(async () => {
          sendUser();
          Modal.success({ content: 'User was created successfully.' });
        }, 500);
      },
    });
  };
  return (
    <div className='form-container'>
      <Form
        form={form}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        name='control-ref'
      >
        <Form.Item
          name='First Name'
          label='First Name'
          required={required}
          tooltip={tooltip}
        >
          <Input
            value={firstName}
            placeholder='John'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='Last Name'
          label='Last Name'
          required={required}
          tooltip={tooltip}
        >
          <Input
            value={lastName}
            placeholder='Doe'
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='Government Identification'
          label='Gov ID'
          required={required}
          tooltip={tooltip}
        >
          <Input
            value={govId}
            onChange={(e) => setGovId(e.target.value)}
            placeholder='1090425258'
          />
        </Form.Item>
        <Form.Item name='email' label='Email' type='email'>
          <Input
            value={email}
            placeholder='example@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            name='email'
          />
        </Form.Item>
        <Form.Item name='company' label='Company'>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='Umbrella Corporation'
          />
        </Form.Item>
        <Form.Item className='btn' wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            className='submit-btn'
            type='primary'
            htmlType='submit'
            disabled={status ? false : true}
            onClick={sending}
          >
            Submit
          </Button>
          <Reset form={form} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default User;
