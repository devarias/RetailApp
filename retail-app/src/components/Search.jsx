import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Button, TreeSelect, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getDataList, currencyFormat } from '../Requests';
import '../styles/Search.css';

function Search() {
  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [key, setKey] = useState(null);
  const [date, setDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { RangePicker } = DatePicker;

  useEffect(() => {
    getInfo('orders');
    getLocation();
  }, []);

  async function getLocation() {
    const tree = [];
    const countries = await getDataList('countries');
    const states = await getDataList('states');
    const cities = await getDataList('cities');
    for (const country of countries) {
      const countryLoc = {
        title: country.country_name,
        value: country.country_name + '-' + country.country_name,
        children: [],
      };
      for (const state of states) {
        if (state.country_id === country.id_) {
          const stateLoc = {
            title: state.state_name,
            value: countryLoc.value + '-' + state.state_name,
            children: [],
          };
          for (const city of cities) {
            if (city.state_id === state.id_) {
              const cityLoc = {
                title: city.city_name,
                value: stateLoc.value + '-' + city.city_name,
              };
              stateLoc.children.push(cityLoc);
            }
          }
          countryLoc.children.push(stateLoc);
        }
      }
      tree.push(countryLoc);
    }
    setTreeData(tree);
  }

  async function getInfo(endpoint) {
    let orders = await getDataList(endpoint);
    orders = orders.map((order) => order.id_);
    const info = await getDataList('orders/' + orders.toString());
    const sourceData = info.map((order) => {
      return {
        orderId: order.id_,
        user: order.user_info.first_name + ' ' + order.user_info.last_name,
        address: order.shipping_info.shipping_address,
        orderDate: order.order_date,
        lastPaymentDate: order.last_payment_date,
        paid: order.paid ? 'Done' : 'No',
        subtotal: currencyFormat(order.subtotal_amount),
        total: currencyFormat(order.total),
      };
    });
    setData(sourceData);
  }

  function filterByDate() {
    const endpoint =
      date[0]._d.toISOString().slice(0, 10) +
      '-' +
      date[1]._d.toISOString().slice(0, 10);
    getInfo('orders/' + endpoint);
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search Order`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  function clearFilter() {
    getInfo('orders');
    setDate(null);
    setKey(null);
  }
  const columns = [
    {
      title: 'ID',
      width: '12%',
      dataIndex: 'orderId',
      key: 'orderId',
      fixed: 'left',
      ...getColumnSearchProps('orderId'),
    },
    {
      title: 'User',
      width: 30,
      dataIndex: 'user',
      key: 'user',
      ...getColumnSearchProps('user'),
    },
    {
      title: 'Address',
      width: 40,
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Order Date',
      width: 20,
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Last Payment',
      width: 20,
      dataIndex: 'lastPaymentDate',
      key: 'lastPaymentDate',
    },
    {
      title: 'Paid',
      width: '10%',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Subtotal',
      width: 30,
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'Total',
      width: 30,
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <>
      <RangePicker
        className='filters'
        value={date}
        onChange={(e) => setDate(e)}
      />
      <Button
        className='filters btn'
        shape='round'
        onClick={() => filterByDate()}
        disabled={date ? false : true}
      >
        Filter by Date
      </Button>
      <TreeSelect
        style={{ width: '200px' }}
        value={key}
        dropdownStyle={{ maxHeight: 400, width: '100%' }}
        treeData={treeData}
        placeholder='Select a Location'
        className='filters'
        onChange={(e) => setKey(e.split('-')[e.split('-').length - 1])}
        treeDefaultExpandAll
      />
      <Button
        className='filters btn'
        shape='round'
        onClick={() => getInfo(`orders/shipping/${key}`)}
        disabled={key ? false : true}
      >
        Filter by Location
      </Button>
      <Button
        className='filters btn-clear'
        shape='round'
        onClick={() => clearFilter()}
      >
        Clear Filters
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        bordered={true}
        pagination={false}
      />
    </>
  );
}
export default Search;
