#!/usr/bin/python3
"""This module has all the routes for the
endpoint for the users in the API"""
from fastapi import APIRouter
from models import storage
from models.user import User
from schemas.user_schema import UserModel

router = APIRouter(prefix="/users", tags=['Users'])


@router.get('/all')
def get_users():
    """This endpoint is used to select all the
    Users in the Database.

    Returns:
        [List]: [information about all users in the database]
    """
    data = storage.all('User')
    return [obj for obj in data] if data != None else None


@router.get('/{id_}')
def get_user(id_: str):
    """This endpoint is used to select an
    specific User in the Database.

    Returns:
        [List]: [information about a users in the database]
    """
    data = storage.one('User', id_)
    if data is None:
        return {'user': 'Not found'}
    return [data]


@router.post('/')
def create_user(info: UserModel):
    """This endpoint is used to save a
    User in the Database.

    Returns:
        [dict]: [successfully message and the information
                 of the User created]
    """
    obj = User(**info.__dict__)
    storage.new(obj)
    msg = storage.save()
    return msg if msg else {'user': 'user created', "info": obj.to_dict()}
