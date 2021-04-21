#!/usr/bin/python3
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.exc import IntegrityError
from models.user import User
from models.order import Order
from models.city import City
from models.country import Country
from models.payment import Payment
from models.shipping import Shipping
from models.state import State
from models.base import Base

classes = {
    'User': User,
    'Order': Order,
    'Country': Country,
    'Shipping': Shipping,
    'City': City,
    'Payment': Payment,
    'State': State
}


class DBStore:
    """Representation of a Country."""

    __engine = None
    __session = None

    def __init__(self):
        """ Instances of the class Payment."""
        database_url = os.getenv('DATABASE_URL')
        self.__engine = create_engine(database_url)

    def all(self, cls=None):
        """Makes a query to bring all the results"""
        data = self.__session.query(classes[cls]).all()
        return None if data == [] else data

    def one(self, cls=None, id_=''):
        """Makes a query to bring an specific result"""
        try:
            return self.__session.query(
                classes[cls]).filter_by(id_=id_).all()[0]
        except ValueError:
            return None

    def new(self, obj):
        """add the object to the current database session"""
        if obj:
            self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        try:
            self.__session.commit()
            return 'Success'
        except IntegrityError:
            self.__session.rollback()
            return {"govId": "Already exists"}

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False,
                                       autoflush=True)
        Session = scoped_session(session_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()
