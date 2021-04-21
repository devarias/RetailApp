#!/usr/bin/python3
"""This module has the class GUID."""
import uuid
from sqlalchemy import String
from sqlalchemy.types import TypeDecorator


class GUID(TypeDecorator):
    """Representation of a GUID"""

    impl = String(32)

    def process_bind_param(self, value, dialect):
        """ process_bind_param """
        if value is not None:
            return uuid.UUID(value)
        return None

    def process_result_value(self, value, dialect):
        """ process_result_value """
        if value is None:
            return value
        return uuid.UUID(value)
