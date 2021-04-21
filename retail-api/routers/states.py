#!/usr/bin/python3
"""This module has all the routes for the endpoint for the states in the API"""
from fastapi import APIRouter
from models import storage

router = APIRouter(prefix="/states", tags=['States'])


@router.get('/')
def get_states():
    """This endpoint is used to select all the
    States in the Database.

    Returns:
        [List]: [information about all states in the database]
    """
    return [obj for obj in storage.all('State')]
