import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getDataList, createShipping } from '../Requests';
import Reset from './Reset';

function Address(props) {
  const [userList, setUserList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [userId, setUserId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [status, setStatus] = useState(false);
  const { confirm } = Modal;
  const { styling } = props;
  const { layout, req } = styling;
  const { labelCol, wrapperCol } = layout;
  const { required, tooltip } = req;
  const [form] = Form.useForm();
  const { Option } = Select;
  const sendShipping = () => {
    createShipping(userId, shippingAddress, countryId, stateId, cityId);
    form.resetFields();
  };
  useEffect(() => {
    const getData = async () => {
      let data = await getDataList('users/all');
      if (data !== null) {
        setUserList(data);
      }
      data = await getDataList('countries');
      setCountryList(data);
    };
    getData();
  }, []);

  function handleChange(event) {
    setShippingAddress(event.target.value);
    if (userId && countryId && stateId && cityId && event.target.value) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }

  async function onChangeCountry(value) {
    setCountryId(value);
    const data = await getDataList('states');
    const states = await data.filter((state) => {
      return state.country_id === value ? state : null;
    });
    setStateList(states);
    setCityList([]);
  }
  async function onChangeState(value) {
    setStateId(value);
    const data = await getDataList('cities');
    const cities = await data.filter((city) => {
      return city.state_id === value ? city : null;
    });
    setCityList(cities);
  }
  const sending = () => {
    confirm({
      title: 'Confirm Data',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to add this address to the User?',
      onOk() {
        setTimeout(async () => {
          sendShipping();
          Modal.success({ content: 'Address was created successfully.' });
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
          name='Select a User'
          label='Select User'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select an User'
            optionFilterProp='user'
            onChange={(value) => setUserId(value)}
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
          name='Select Country'
          label='Select Country'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select a Country'
            optionFilterProp='country'
            onChange={onChangeCountry}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryList.map((country) => (
              <Option key={country.id_} value={country.id_}>
                {country.country_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='Select State'
          label='Select State'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select a State'
            optionFilterProp='state'
            onChange={onChangeState}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {stateList.map((state) => (
              <Option key={state.id_} value={state.id_}>
                {state.state_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='Select City'
          label='Select City'
          required={required}
          tooltip={tooltip}
        >
          <Select
            showSearch
            placeholder='Select a City'
            optionFilterProp='city'
            onChange={(value) => setCityId(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cityList.map((city) => (
              <Option key={city.id_} value={city.id_}>
                {city.city_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='Address Line'
          label='Address Line'
          required={required}
          tooltip={tooltip}
        >
          <Input value={shippingAddress} onChange={handleChange} />
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

export default Address;
