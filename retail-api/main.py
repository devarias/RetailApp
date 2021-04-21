#!/usr/bin/python3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import (users, orders, shippings, payments, countries, states,
                     cities)

app = FastAPI(
    title='Retail API',
    description='Add and search, users and Orders.',
    version='1.0',
)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix='/api')
app.include_router(orders.router, prefix='/api')
app.include_router(shippings.router, prefix='/api')
app.include_router(payments.router, prefix='/api')
app.include_router(countries.router, prefix='/api')
app.include_router(states.router, prefix='/api')
app.include_router(cities.router, prefix='/api')

if __name__ == "__main__":
    uvicorn.run('main:app')
