# Fitcard
Development test

## Installation process
First thing we need is to understand that this repo contains a server and client folders. The first one, was built using [AdonisJS](https://adonisjs.com/) and the second one is a [VueJS](https://vuejs.org/) + [Vuetify](https://vuetifyjs.com/pt-BR/) application

## Server

To setup the server, just cd into server folder and run the following commands:

```bash
npm i -g @adonisjs/cli
```
```bash
npm i
```
```bash
npm i --save sqlite3
```
After installation, run the following command to migrate tables into database:
```
adonis migration:run
```
By the way,

The .env file on server folder make use of mail drivers. I strongly recommend the use of mailtrap.io to configure mail sending. Just open the file and edit the following lines:

```bash
MAIL_USERNAME=YOUR_MAIL_USERNAME
MAIL_PASSWORD=YOUR_MAIL_PASSWORD
SMTP_HOST=smtp.mailtrap.io
```

To see the functional tests applied, run ``` adonis test```
To get the server up and running, run ``` adonis serve --dev```

## Client

All you need to do is cd into client folder and run
```bash
npm i
```
And
```bash
npm start
```
In order to get application running...

## License
[MIT](https://choosealicense.com/licenses/mit/)
