import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Select, Input, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getDataList, currencyFormat, createPayment } from '../Requests';
import Reset from './Reset';

function Payment(props) {
  const [userList, setUserList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState('');
  const [orderId, setOrderId] = useState('');
  const [type, setType] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState(false);
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { styling } = props;
  const { layout, req } = styling;
  const { labelCol, wrapperCol } = layout;
  const { required, tooltip } = req;
  const methods = ['Credit Card', 'Debit Card', 'Cash'];
  const sendPayment = () => {
    createPayment(orderId, type, payment);
    form.resetFields();
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getDataList('users/all');
      if (data !== null) {
        setUserList(data);
      }
    };
    getData();
  }, []);
  async function onChangeUser(value) {
    const endpoint = 'orders/' + value;
    const data = await getDataList(endpoint);
    if (data === null) {
      setOrders([]);
    } else {
      setOrders(data);
    }
    setTotal('');
  }
  function onChangeCost(value) {
    for (const order of orders)
      if (order.id_ === value) {
        setTotal(currencyFormat(order.total));
      }
    setOrderId(value);
  }
  function onChangePaymentType(value) {
    setType(value);
  }
  function handleAmount(event) {
    setPayment(event.target.value);
    if (event.target.value && orderId && type) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }
  const sending = () => {
    confirm({
      title: 'Confirm Data',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to create this Payment of ${currencyFormat(
        parseInt(payment)
      )}?`,
      onOk() {
        setTimeout(async () => {
          sendPayment();
          setTotal('');
          Modal.success({ content: 'Payment was created successfully.' });
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
          name='Select an User'
          label='Select User'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select an User'
            optionFilterProp='user'
            onChange={onChangeUser}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {userList.map((name) => (
              <Option key={name.id_} value={name.id_}>
                {name.first_name + ' ' + name.last_name + ' - ' + name.gov_id}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='Select an Order'
          label='Select an Order'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select an Order'
            optionFilterProp='order'
            onChange={onChangeCost}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {orders
              ? orders.map((order) => (
                  <Option key={order.id_} value={order.id_}>
                    {order.id_}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item label='Total'>
          <Input label='cost' value={total} disabled />
        </Form.Item>
        <Form.Item
          name='Select Type Payment'
          label='Select Type Payment'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select Type Payment'
            optionFilterProp='payment'
            onChange={onChangePaymentType}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {methods.map((method) => (
              <Option key={method} value={method}>
                {method}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='Pay Amount'
          label='Pay Amount'
          required={required}
          tooltip={tooltip}
        >
          <Input value={payment} onChange={handleAmount} />
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

export default Payment;
