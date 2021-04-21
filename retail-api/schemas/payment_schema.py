#!/usr/bin/python3
"""This module is used to have the class PaymentModel to receive the parameters
to create a Payment in the database."""
from pydantic import BaseModel


class PaymentModel(BaseModel):
    """ Class PaymentModel to manage the data required
    from the body to create the Payment object to save
    in the database.
    """
    order_id: int
    payment_type: str
    total: int

    class Config:
        """Config to use orm mode"""
        orm_mode = True
