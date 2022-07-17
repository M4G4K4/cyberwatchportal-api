# Cyber Watch Portal API

API that contains all business logic of the cyber watch.

Cyber watch is a platform that automatacly assess website security, and represent it in a easy to read score to every user make their decision to trust or not on the website.

Makes use of rabbitMQ to send events to [https://github.com/M4G4K4/cyber_watch_analyzer](README.md), this project is reponsible of executing all the scans to the website received using some cli and others tools.

## Development

The first time, is needed to run

```
npm install
```

Then just start the server with

```
npm run start
```

Start the server in development
```
npm run dev
```
This command will use nodemon to start the server, 
will listen to files changes to restart the server

## Tests

Run tests

```
npm run test
```

See test code coverage

```
npm run coverage
```

## API Documentation

Postman collection: https://documenter.getpostman.com/view/9285303/UVR8o7Q7
