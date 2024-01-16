
# Project managment web application

Project managment web application made using Django Rest Framework and React.


## Features

- Register and login 
    - JWT Authentication
- Projects
- Boards
- Tasks


## Getting started

1. Install [Python](https://www.python.org/downloads/), [Yarn](https://classic.yarnpkg.com/en/docs/install/), [Node.js](https://nodejs.org/en/).
2. Clone the repo
```
$ git clone https://github.com/shardan19/ProjectManagmentApp.git
$ cd .\ProjectManagmentApp\
```
3. Install python virtual environment. Install backend dependencies and run migrations to create database. Default database is SQLite.
```
$ cd backend
$ python -m venv venv
$ ./venv/Scripts/activate
$ pip install -r requirements.txt
$ python manage.py migrate
```
4. Install frontend dependencies.
```
$ cd frontend
$ yarn install
```
5. Run both frontend and backend servers with following commands in appropriate directories.
```
$ python manage.py runserver
$ yarn start
```

