# HOT TAKES

## SECURE WEB APPLICATION OF GASTRONOMIC ADVICE

### BEST REVIEWS ON HOT SAUCES ON THE WEBREVIEWS

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Piiquante is dedicated to the creation of spicy sauces whose recipes are kept
secret. To build on its success and generate more buzz, the company
want to create a web application in which users can add
their favorite sauces and liking or disliking sauces added by others.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

#### Frontend part

Download or clone the frontend part via this repository https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Here are the dependancies you need to install:

- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

On Windows, these installations require to use PowerShell in administrator mode.

The, clone this repo and run `npm install`.

#### Backend part

Install the dependencies in package.json by running this command:

```
npm i or npm install
```

Rename the `.env.example` file to `.env` then add your MongooDB credentials.
Generate a strong key and use it as TOKEN.

```
DB_USERNAME = "xxxx"
DB_PASSWORD = "xxxx"
DB_CLUSTER = "clusterX.XXX"
DB_NAME ="xxxx"
JWT_KEY_TOKEN ="put a strong key"
```

## Usage <a name = "usage"></a>

### Frontend part

Run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to

```
http://localhost:4200
```

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local frontend server.

### Backend part

Start the application with the command _`nodemon server`_ <br>
The console should display the following message at the end:

```
Successful connection to MongoDB
```

Use `Ctrl+C` in the terminal to stop the local backend server.
