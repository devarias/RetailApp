#!/usr/bin/python3
"""This module has the class Payment."""
import datetime
import uuid
from sqlalchemy import Column, String, Integer, Date, Boolean, ForeignKey
from .base import Base
from .generator.guid import GUID


class Payment(Base):
    """Representation of a Payment"""

    __tablename__ = 'payments'
    id_ = Column(GUID(), primary_key=True, default=uuid.uuid4)
    payment_type = Column(String(11), nullable=False)
    payment_date = Column(Date, nullable=False)
    payment_status = Column(Boolean, default=False)
    total = Column(Integer, nullable=False)
    order_id = Column(Integer, ForeignKey('orders.id_'))

    def __init__(self, order_id, payment_type, total):
        """ Instances of the class Payment."""
        self.id_ = str(uuid.uuid4())
        self.order_id = order_id
        self.payment_type = payment_type
        self.payment_date = datetime.datetime.now()
        self.total = total

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
