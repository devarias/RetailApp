#!/usr/bin/python3
"""This module has the class User."""
import uuid
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .base import Base
from .generator.guid import GUID


class User(Base):
    """Representation of a User"""

    __tablename__ = 'users'
    id_ = Column(GUID(), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    gov_id = Column(Integer, nullable=False)
    email = Column(String(50), nullable=True, default='')
    company = Column(String(50), nullable=True, default='')
    shippings = relationship('Shipping')

    def __init__(self, first_name, last_name, gov_id, email='', company=''):
        """ Instances of the class User."""
        self.id_ = str(uuid.uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.gov_id = gov_id
        self.email = email
        self.company = company

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
