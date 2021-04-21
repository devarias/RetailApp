#!/usr/bin/python3
"""This module is used to have the class OrderModel to receive the parameters
to create a Order in the database."""
from pydantic import BaseModel


class OrderModel(BaseModel):
    """ Class OrderModel to manage the data required
    from the body to create the Order object to save
    in the database.
    """
    user_id: str
    shipping_id: int
    subtotal_amount: int

    class Config:
        """Config to use orm mode"""
        orm_mode = True
