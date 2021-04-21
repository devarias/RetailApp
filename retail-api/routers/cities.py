#!/usr/bin/python3
"""This module has all the routes for the
endpoint for the cities in the API"""
from fastapi import APIRouter
from models import storage

router = APIRouter(prefix="/cities", tags=['cities'])


@router.get('/')
def get_cities():
    """This endpoint is used to select all the
    Cities in the Database.

    Returns:
        [List]: [information about all cities in the database]
    """
    return list(storage.all('City'))
