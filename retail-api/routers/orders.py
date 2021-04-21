#!/usr/bin/python3
"""This module has all the routes for the endpoint for
the orders in the API"""
import datetime
from fastapi import APIRouter
from models import storage
from models.order import Order
from schemas.order_schema import OrderModel

router = APIRouter(prefix="/orders", tags=['Orders'])


@router.get('/{order}')
async def get_order(order: str):
    """This endpoint is used to get different
    kind of information about Orders from in the Database.
    Depending on the entry in the url, you have different options
    1. Request a order id.
    2. Request many order ids separated by commas.
    3. Request orders between date ranges.
    4. Request the list of the orders from the same user.

    Returns:
        [dict]: [depending the option that you passed to the url]
    """
    def get_all(order_list):
        """ This method is to request many order ids separated
        by commas.

        Args:
            id ([str]): [order ids separated by commas]

        Returns:
            [List]: [all the orders requested]
        """
        return [get_one(order)[0] for order in order_list.split(',')]

    def get_one(id_):
        """ This method is to request a single order ids separated
        by id.

        Args:
            id ([str]): [order id]

        Returns:
            [List]: [the information about the order requested]
        """
        order = storage.one('Order', id_)
        user = storage.one('User', order.user_id)
        shipping = storage.one('Shipping', order.shipping_id)
        country = storage.one('Country', shipping.country_id)
        payments = storage.all('Payment')
        payment_list = []
        if payments != None:
            for payment in payments:
                if str(payment.order_id) == id_:
                    payment_list.append(payment)
        total = order.subtotal_amount + (country.shipping_cost *
                                         order.subtotal_amount)
        order.shipping_info = shipping
        order.payments = payment_list
        order.last_payment_date = [] if payment_list == [] else max(
            [last.payment_date for last in payment_list])
        order.total = int(total)
        order.user_info = user
        return [order]

    def get_order_by_user_id(id_):
        """ This method is to request all the orders
        that belong to the same user id requested.

        Args:
            id ([str]): [user id]

        Returns:
            [List]: [all the orders requested]
        """
        data = storage.all('Order')
        if data != None:
            orders = [str(x.id_) for x in data if x.user_id == id_]
            return get_all(','.join(orders))
        return None

    def get_order_by_date(date):
        """ This method is to request orders between date ranges.

        Args:
            id ([date]): [starting and ending dates]

        Returns:
            [List]: [all the orders requested]
        """
        data = storage.all('Order')
        start = date[:10].split('-')
        end = date[11:].split('-')
        start = datetime.date(int(start[0]), int(start[1]), int(start[2]))
        end = datetime.date(int(end[0]), int(end[1]), int(end[2]))
        order_list = []
        for order in data:
            if start < data[0].order_date and end > data[0].order_date:
                order_list.append(get_one(str(order.id_))[0])
        return order_list

    error = {
        'error':
        'Order not found' if ',' not in order else 'A Order was not found'
    }
    try:
        if ',' in order:
            return get_all(order)
        if len(order) == 36:
            return get_order_by_user_id(order)
        if len(order) == 21:
            return get_order_by_date(order)
        return get_one(order)
    except IndexError:
        return error
    except AttributeError:
        return {'detail': 'Url Not Found'}


@router.get('/shipping/{key}')
async def get_order_by_key(key: str):
    """This endpoint is used to consult all the orders with
    the same key as Country, State or City in the Database.

    Returns:
        [dict]: [successfully message and the information
                 of the Order created]
    """
    search_key = 0
    countries = storage.all('Country')
    for country in countries:
        if country.country_name == key:
            search_key = country.id_
            break
    if search_key == 0:
        states = storage.all('State')
        for state in states:
            if state.state_name == key:
                search_key = state.id_
                break
    if search_key == 0:
        cities = storage.all('City')
        for city in cities:
            if city.city_name == key:
                search_key = city.id_
                break
    if search_key == 0:
        return {'key': '{} Not Found'.format(key)}
    shippings = storage.all('Shipping')
    order_list = []
    for shipping in shippings:
        if search_key in (shipping.country_id, shipping.state_id,
                          shipping.city_id):
            order_list.append(shipping.id_)
    orders = storage.all('Order')
    final_orders = []
    for order in orders:
        if order.shipping_id in order_list:
            final_orders.append(str(order.id_))
    final_orders = ','.join(final_orders)
    return await get_order(final_orders)


@router.post('/')
def create_order(info: OrderModel):
    """This endpoint is used to save a
    Order in the Database.

    Returns:
        [dict]: [successfully message and the information
                 of the Order created]
    """
    data = storage.all('Order')
    id_ = 1 if data is None else max((one.id_ for one in data)) + 1
    obj = Order(id_, **info.__dict__)
    storage.new(obj)
    msg = storage.save()
    return msg if msg else {'oder': 'order created', "info": obj.to_dict()}


@router.get('/')
def get_all_orders():
    """This endpoint is used to get all the
    Orders in the Database.

    Returns:
        [dict]: [all the information of the Orders]
    """
    return [obj for obj in storage.all('Order')]
