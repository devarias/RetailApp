#!/usr/bin/python3
"""This module has the class State."""
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class State(Base):
    """Representation of a State"""

    __tablename__ = 'states'
    id_ = Column(Integer, primary_key=True)
    state_name = Column(String(128), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id_'))
    cities = relationship('City')

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
