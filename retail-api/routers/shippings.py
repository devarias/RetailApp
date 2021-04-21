#!/usr/bin/python3
"""This module has all the routes for the endpoint for
the shippings in the API"""
from fastapi import APIRouter
from models import storage
from models.shipping import Shipping
from schemas.shipping_schema import ShippingModel

router = APIRouter(prefix="/shippings", tags=['Shippings'])


@router.get('/')
def get_shipping():
    """This endpoint is used to select all the
    Shippings in the Database.

    Returns:
        [List]: [information about all shippings in the database]
    """
    return list(storage.all('Shipping'))


@router.post('/')
def create_shipping(info: ShippingModel):
    """This endpoint is used to save a
    Shipping in the Database.

    Returns:
        [dict]: [successfully message and the information
                 of the Shipping created]
    """
    data = storage.all('Shipping')
    id_ = 1 if data is None else max((one.id_ for one in data)) + 1
    obj = Shipping(id_, **info.__dict__)
    storage.new(obj)
    msg = storage.save()
    return msg if msg else {
        'shipping': 'shipping created',
        "info": obj.to_dict()
    }
