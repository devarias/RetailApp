#!/usr/bin/python3
"""This module is used to have the class ShippingModel to
receive the parameters to create a Shipping in the database."""
from pydantic import BaseModel


class ShippingModel(BaseModel):
    """ Class ShippingModel to manage the data required
    from the body to create the Shipping object to save
    in the database.
    """
    user_id: str
    shipping_address: str
    country_id: int
    state_id: int
    city_id: int

    class Config:
        """Config to use orm mode"""
        orm_mode = True

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
