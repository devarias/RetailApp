#!/usr/bin/python3
"""This module has the class City."""
from sqlalchemy import Column, String, Integer, ForeignKey
from .base import Base


class City(Base):
    """Representation of a City."""

    __tablename__ = 'cities'
    id_ = Column(Integer, primary_key=True)
    city_name = Column(String(50), nullable=False)
    state_id = Column(Integer, ForeignKey('states.id_'))

    def __init__(self, id_, city_name, state_id):
        self.id_ = id_
        self.city_name = city_name
        self.state_id = state_id

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
