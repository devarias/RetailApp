#!/usr/bin/python3
"""This module has all the routes for the
endpoint for the countries in the API"""
from fastapi import APIRouter
from models import storage

router = APIRouter(prefix="/countries", tags=['Countries'])


@router.get('/')
def get_countries():
    """This endpoint is used to select all the
    Countries in the Database.

    Returns:
        [List]: [information about all countries in the database]
    """
    return list(storage.all('Country'))
