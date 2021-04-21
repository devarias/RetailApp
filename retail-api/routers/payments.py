#!/usr/bin/python3
"""This module has all the routes for the endpoint for
the payments in the API"""
from fastapi import APIRouter
from models import storage
from models.payment import Payment
from schemas.payment_schema import PaymentModel

router = APIRouter(prefix="/payments", tags=['Payments'])


@router.post('/')
async def create_payment(info: PaymentModel):
    """This endpoint is used to save a
    Payment in the Database.

    Returns:
        [dict]: [successfully message and the information
                 of the Payment created]
    """
    obj = Payment(**info.__dict__)
    print(obj.to_dict())
    storage.new(obj)
    msg = storage.save()
    return msg if msg else {
        'payment': 'payment created',
        "info": obj.to_dict()
    }
