#!/usr/bin/python3
"""This module has the class Country."""
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.orm import relationship
from .base import Base


class Country(Base):
    """Representation of a Country."""

    __tablename__ = 'countries'
    id_ = Column(Integer, primary_key=True)
    country_name = Column(String(50), nullable=False)
    shipping_cost = Column(Float(2, 2), nullable=False)
    states = relationship('State')

    def __init__(self, id_, country_name, shipping_cost):
        self.id_ = id_
        self.country_name = country_name
        self.shipping_cost = shipping_cost

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
