

Web application to manage a retail business, where you can create users, add address to the users, create orders to the users, and create payments. The web application have a view to search and filter data from the database.

# RetailApp
<p align="center">
  <img src="https://wpforms.com/wp-content/uploads/2018/08/invoicing-software-for-your-wordpress-order-forms.jpg">
</p>

This README provides guidelines to install, and use the Retail API and the Web Application.

# Content
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Routes and Methods](#routes-and-methods)
  - [Users Routes](#users-routes)
  - [Shippings Routes](#shippings-routes)
  - [Orders Routes](#orders-routes)
  - [Payment Route](#payment-route)
  - [Country Route](#country-route)
  - [State Route](#state-route)
  - [City Route](#city-route)
- [Login](#login)
- [Built With](#built-with)
- [Author](#author)

# Getting Started

Web application to manage a retail business, where you can create users, add address to the users, create orders to the users, and create payments. The web application have a view to search and filter data from the database.

# Prerequisites

* `mysql` => v8.0.23
* `npm` => v6.14.4
* `node` => v10.19.0

# Installation

* `git clone https://github.com/devarias/RetailApp.git`
* `cd RetailApp`
* First you have to enable the virtual environment for python.
* `source env.sh` => Here you will install virtualenv with `pip3`, create the venv and enter to this.
* Everything is installed and ready to run.

# Running

* You will be now in the virtual environment to run the installation and start the RESTful API and Web Application, or just start them.
* `./start`
  * This command will start the instructions to install or start the RESTful API and the Web Application.
  * The option number `1` is to create the Database, create the user in MySQL and install all the dependencies and the python requirements to run the application, after installation will start the RESTful API and the Web Application.
  * Remember we are going to create the DataBase and the users, we will do under the `root` user, then the program will ask you for your mysql password.
  * The option number `2` is to start the RESTful API and the Web Application, because you have the database created and everything created.

# Routes and Methods

* ## Users Routes

| Route            | Method | Description                       |
| ---------------- | :----: | --------------------------------- |
| `api/users/all`  | `get`  | To get all the data of the users  |
| `api/users/{id}` | `get`  | To get the information of an user |
| `api/users`      | `post` | To create an user                 |
<br />

* ## Shippings Routes

| Route            | Method | Description                                   |
| ---------------- | :----: | --------------------------------------------- |
| `api/shippings/` | `get`  | To get all the data of the shipping addresses |
| `api/shippings/` | `post` | To create a new shipping addresses to an user |
<br />

* ## Orders Routes

| Route                       | Method | Description                                                       |
| --------------------------- | :----: | ----------------------------------------------------------------- |
| `api/orders`                | `get`  | To get all the data of the orders                                 |
| `api/orders/`               | `post` | To create an order                                                |
| `api/orders/shipping/{key}` | `get`  | To get all the orders with the same key as Country, State or City |
| `api/orders/{order}`        | `get`  | To get all the data of the orders according to the string passed  |

* `{order}` could be:
  * `2` a single order.
  * `1,2,3,4,5` a list of orders separated by comma.
  * `123e4567-e89b-12d3-a456-426614174000` a user id to know all the orders by it.
  * `2021-04-15-2021-04-25` a date range to know all the orders between that range.
<br />

* ## Payment Routes

| Route          | Method | Description                         |
| -------------- | :----: | ----------------------------------- |
| `api/payments` | `get`  | To get all the data of the payments |
<br />

* ## Country Route

| Route           | Method | Description                          |
| --------------- | :----: | ------------------------------------ |
| `api/countries` | `get`  | To get all the data of the countries |
<br />

* ## State Route

| Route        | Method | Description                       |
| ------------ | :----: | --------------------------------- |
| `api/states` | `get`  | To get all the data of the states |
<br />

* ## City Route

| Route        | Method | Description                       |
| ------------ | :----: | --------------------------------- |
| `api/cities` | `get`  | To get all the data of the cities |
<br />

# Login


# Built With

  * Python
  * FastAPI
  * MySQL
  * React.js
  * npm
  * Bash
  * Auth0

# Author

<div align='center'>
  <div>
    <table>
      <tr>
        <td valign="top" align='center'>
          <a href="https://github.com/devarias" target="_blank">
            <p>David Arias Fuentes</p>
            <img alt="github_page" src="https://avatars.githubusercontent.com/u/61300552?v=4" height="80" width="80"/>
          </a>
          <br />
          <a href="https://www.linkedin.com/in/devarias/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/plasticine/100/000000/linkedin.png" width="35" />
          </a>
          <a href="https://www.twitter.com/DavidDevArias" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/plasticine/100/000000/twitter.png" width="35" />
          </a>
        </td>
      </tr>
    </table>
  </div>
</div>

