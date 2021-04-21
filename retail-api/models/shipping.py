#!/usr/bin/python3
"""This module has the class Shipping."""
from .base import Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Shipping(Base):
    """Representation of a Shipping."""

    __tablename__ = 'shippings'
    id_ = Column(Integer, primary_key=True)
    shipping_address = Column(String(100), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id_'))
    countries = relationship('Country')
    state_id = Column(Integer, ForeignKey('states.id_'))
    state = relationship('State')
    city_id = Column(Integer, ForeignKey("cities.id_"))
    city = relationship('City')
    user_id = Column(String(50), ForeignKey('users.id_'))

    def __init__(self, id_, user_id, shipping_address, country_id, state_id,
                 city_id):
        """ Instances of the class Shipping."""
        self.id_ = id_
        self.user_id = user_id
        self.shipping_address = shipping_address
        self.country_id = country_id
        self.state_id = state_id
        self.city_id = city_id

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
