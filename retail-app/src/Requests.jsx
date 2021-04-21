import axios from 'axios';
const URL = 'http://localhost:8000/api/';
export async function createUser(firstName, lastName, govId, email, company) {
  const config = {
    method: 'POST',
    url: URL + 'users',
    headers: { 'Content-Type': 'application/json' },
    data: {
      first_name: firstName,
      last_name: lastName,
      gov_id: parseInt(govId),
      email: email,
      company: company,
    },
  };
  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}
export async function getDataList(endpoint) {
  const config = {
    method: 'GET',
    url: URL + endpoint,
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}
export async function createShipping(
  userId,
  shippingAddress,
  countryId,
  stateId,
  cityId
) {
  const config = {
    method: 'POST',
    url: URL + 'shippings',
    headers: { 'Content-Type': 'application/json' },
    data: {
      user_id: userId,
      shipping_address: shippingAddress,
      country_id: parseInt(countryId),
      state_id: parseInt(stateId),
      city_id: parseInt(cityId),
    },
  };
  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}
export async function createOrder(userId, shippingId, subtotalAmount) {
  const config = {
    method: 'POST',
    url: URL + 'orders',
    headers: { 'Content-Type': 'application/json' },
    data: {
      subtotal_amount: parseInt(subtotalAmount),
      user_id: userId,
      shipping_id: parseInt(shippingId),
    },
  };
  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}
export function currencyFormat(num) {
  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export async function createPayment(orderId, type, amount) {
  const config = {
    method: 'POST',
    url: URL + 'payments',
    headers: { 'Content-Type': 'application/json' },
    data: {
      order_id: orderId,
      payment_type: type,
      total: parseInt(amount),
    },
  };
  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}
