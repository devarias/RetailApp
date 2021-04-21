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

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
