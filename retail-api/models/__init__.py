#!/usr/bin/python3
"""initialize the models package."""
from .engine.storage import DBStore

storage = DBStore()
storage.reload()
