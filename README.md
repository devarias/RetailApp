# RetailApp
<p align="center">
  <img src="https://www.code-inspector.com/project/21669/score/svg">
  <img src="https://www.code-inspector.com/project/21669/status/svg">
</p>

<p align="center">
  <img src="https://wpforms.com/wp-content/uploads/2018/08/invoicing-software-for-your-wordpress-order-forms.jpg">
</p>

This README provides guidelines to install, and use the Retail API and the Web Application.

# Content
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [How to Use](#how-to-use)
  - [Login](#login)
  - [Create an User](#create-an-user)
  - [Create a Shipping Address](#create-a-shipping-address)
  - [Create an Order](#create-an-order)
  - [Create a Payment](#create-a-payment)
  - [Make a Search](#make-a-search)
- [Routes and Methods](#routes-and-methods)
  - [Users Routes](#users-routes)
  - [Shippings Routes](#shippings-routes)
  - [Orders Routes](#orders-routes)
  - [Payment Route](#payment-route)
  - [Country Route](#country-route)
  - [State Route](#state-route)
  - [City Route](#city-route)
- [Built With](#built-with)
- [Video Demo](#video-demo)
- [Author](#author)

# Getting Started

Web application to manage a retail business, where you can create users, add address to the users, create orders to the users, and create payments. The web application have a view to search and filter data from the database.

# Prerequisites

* `mysql` => v8.0.23
* `npm` => v6.14.4
* `node` => v10.19.0
* `python` => v3.8.5

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
  * To exit from the web application in the terminal just press `Ctrl + C`
  * To exit from the virtual environment just type `deactivate`

# How to use

* ## Login

To log in in the web application use the next credentials:

  * email: `react.fastapi.app@gmail.com`
  * password: `Password123`

<p align="center">
  <img src="https://i.imgur.com/ojEJZ2k.png">
</p>

Once you are logged in, you are in the Home with a Navigate Side Bar with the next options:

* Users: You can create Users.
* Addresses: You can add to a specific user a shipping address.
* Orders: You can select an user and create an order to it.
* Payments: You can select the user and the order to create a payment.
* Search: You have a table to search by Order ID, by name, by address, by a range date, and by location.
* Logout: Logout of the web application.

<p align="center">
  <img src="https://i.imgur.com/jcH0vmY.png">
</p>

* ## Create an User

<p align="center">
  <img src="https://i.imgur.com/2aIB10M.png">
</p>

Here you can create an User, the fields required have the exclamation mark next to the label.

* First Name. (Required)
* Last Name. (Required)
* Gov ID. (Required)
* email.
* Company

Notice if you don't fill out the required fields the submit button will stay disabled. Also you can reset the fields with the button Reset.
When you click the submit button will appear a modal box asking to confirm the data given.

<p align="center">
  <img src="https://i.imgur.com/0z9h4h7.png">
</p>

If you confirm the data, a successfully message will show up.

<p align="center">
  <img src="https://i.imgur.com/gf5wJEq.png">
</p>

* ## Create a Shipping Address

<p align="center">
  <img src="https://i.imgur.com/qFoJUzb.png">
</p>

In this section you can add a shipping address to a User.

* Select User. (required)
* Select Country. (required)
* Select State. (required)
* Select City. (required)
* Address Line. (required)

<p align="center">
  <img src="https://i.imgur.com/e1Vp1ee.png">
</p>

* ## Create an Order

Now you can add orders to the users, selecting the user and its shipping address.
When you select the address it will show you automatically the State, Country and Shipping taxes.
And if you are typing the cost of the order, you can see the total including the taxes.

* Select User. (required)
* Select an Address. (required)
* State.
* Country.
* Order Cost. (required)
* Shipping Taxes.
* Total

<p align="center">
  <img src="https://i.imgur.com/VOeVQxP.png">
</p>

* ## Create a Payment

Now you can add payments to the order's users, selecting the user and its order.
When you select the order it will show you automatically the Total Cost of the Order.
Also you have to select the Type of Payment, Credit Card, Debit Card, or Cash.

* Select User. (required)
* Select an Order. (required)
* Total.
* Select Type Payment. (required)
* Pay Amount. (required)

<p align="center">
  <img src="https://i.imgur.com/4HKUdfh.png">
</p>

* ## Make a Search

<p align="center">
  <img src="https://i.imgur.com/SdshSj3.png">
</p>

Here you can filter by Order ID, or by user name, or by shipping address, also you can filter by a date range or by location.

<p align="center">
  <img src="https://i.imgur.com/PMjvkgi.png">
</p>


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



# Built With

  * Python
  * FastAPI
  * MySQL
  * React.js
  * npm
  * Bash
  * Auth0

# Demo Video

You can find the demo video [here](https://youtu.be/42OnAwutGCw)

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

