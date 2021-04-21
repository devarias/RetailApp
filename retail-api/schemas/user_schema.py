#!/usr/bin/python3
"""This module is used to have the class UserModel to receive the parameters
to create a User in the database."""
from typing import Optional
from pydantic import BaseModel


class UserModel(BaseModel):
    """ Class UserModel to manage the data required
    from the body to create the User object to save
    in the database.
    """
    first_name: str
    last_name: str
    gov_id: int
    email: Optional[str] = ''
    company: Optional[str] = ''

    class Config:
        """Config to use orm mode"""
        orm_mode = True
