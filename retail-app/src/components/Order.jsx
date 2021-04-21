import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Select, Input, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getDataList, createOrder, currencyFormat } from '../Requests';
import Reset from './Reset';

function Order(props) {
  const [userList, setUserList] = useState([]);
  const [shippingsList, setShippingsList] = useState([]);
  const [orderCost, setOrderCost] = useState('');
  const [userId, setUserId] = useState('');
  const [shippingId, setShippingId] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [taxes, setTaxes] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState(false);
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const { Option } = Select;
  const sendOrder = () => {
    createOrder(userId, shippingId, orderCost);
    form.resetFields();
  };

  useEffect(() => {
    const callData = async () => {
      const data = await getDataList('users/all');
      setUserList(data);
    };
    callData();
  }, []);

  async function onChangeUser(value) {
    setUserId(value);
    const data = await getDataList('shippings');
    const addresses = await data.filter((address) => {
      return address.user_id === value ? address : null;
    });
    setShippingsList(addresses);
  }
  async function onChangeShipping(value) {
    setShippingId(value);
    const countries = await getDataList('countries');
    const states = await getDataList('states');
    for (const address of shippingsList)
      if (address.id_ === value) {
        for (const _country of countries)
          if (address.country_id === _country.id_) {
            setCountry(_country.country_name);
            setTaxes(_country.shipping_cost);
          }
        for (const _state of states)
          if (address.state_id === _state.id_) setState(_state.state_name);
      }
  }
  function handleCost(event) {
    setOrderCost(event.target.value);
    const sub = parseFloat(event.target.value);
    isNaN(sub) ? setTotal('$0') : setTotal(currencyFormat(sub + taxes * sub));
    if (userId && shippingId && event.target.value) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }
  const sending = () => {
    confirm({
      title: 'Confirm Data',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to create this Order to the User by ${currencyFormat(
        parseInt(orderCost)
      )}?`,
      onOk() {
        setTimeout(async () => {
          sendOrder();
          setState('');
          setCountry('');
          setTaxes('');
          setTotal('$0');
          Modal.success({ content: 'Order was created successfully.' });
        }, 500);
      },
    });
  };

  return (
    <div className='form-container'>
      <Form form={form} {...props.styling.layout} name='control-ref'>
        <Form.Item
          name='Select a User'
          label='Select User'
          {...props.styling.req}
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
          name='Select an Address'
          label='Select an Address'
          {...props.styling.req}
        >
          <Select
            showSearch
            placeholder='Select an Address'
            optionFilterProp='shipping'
            onChange={onChangeShipping}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {shippingsList.map((address) => (
              <Option key={address.shipping_address} value={address.id_}>
                {address.shipping_address}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='State'>
          <Input label='State' value={state} disabled />
        </Form.Item>
        <Form.Item label='Country'>
          <Input label='Country' value={country} disabled />
        </Form.Item>
        <Form.Item name='Order Cost' label='Order Cost' {...props.styling.req}>
          <Input value={orderCost} onChange={handleCost} />
        </Form.Item>
        <Form.Item label='Shipping Taxes'>
          <Input label='cost' value={(taxes * 100).toString() + '%'} disabled />
        </Form.Item>
        <Form.Item label='Total'>
          <Input label='cost' value={total} disabled />
        </Form.Item>
        <Form.Item className='btn' {...props.styling.tailLayout}>
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

export default Order;