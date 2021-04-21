#!/usr/bin/python3
"""This module has the class Order."""
import datetime
from sqlalchemy import Column, Float, Integer
from sqlalchemy import Date, Boolean, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Order(Base):
    """Representation of a Order."""

    __tablename__ = 'orders'
    id_ = Column(Integer, primary_key=True)
    order_date = Column(Date, nullable=False)
    subtotal_amount = Column(Float(9, 2), nullable=False)
    paid = Column(Boolean, nullable=False, default=False)
    user_id = Column(String(36), ForeignKey('users.id_'))
    users = relationship('User')
    shipping_id = Column(String(36), ForeignKey('shippings.id_'))
    shippings = relationship('Shipping')
    payments = relationship('Payment')

    def __init__(self, id_, subtotal_amount, user_id, shipping_id):
        self.id_ = id_
        self.order_date = datetime.datetime.now()
        self.subtotal_amount = subtotal_amount
        self.user_id = user_id
        self.shipping_id = shipping_id

    def print_dict(self):
        """Method to print the dictionary"""
        print(self.__dict__)

    def to_dict(self):
        """Method to convert the class in a dictionary"""
        return self.__dict__
