# sgbouncewizard

This repository contains the front-end source code for the UCI Capstone 2018-19 Bounce Wizard Project.

### Team Members:

- Kristen DeVore
- Joseph Bustamante
- Cody Han
- Khuong Tiet
- Gevorg Gabrielyan
- Kenny Matsudo

## Live Demo

Visit a live demo of the site:`http://sgbouncewizard.netlify.com`

## Setup

Before running, make sure you have the proper environmental files and endpoints configured. This includes the api and socket endpoints. Please contact team members for more information.

## Starting Front End w/ json-server

This runs the application with a json database stored locally. No backend service is required.

1. `$ npm run dev:mock`
2. `$ npm run json-server`

## Starting Front End w/ Backend Docker Container

Please make sure the backend service and mySQL docker container are running prior to running the front end application. More information on this can be found at: https://github.com/jimmyjames85/bouncecm

- `$ npm run dev`

## Running Storybook

> Storybook is a UI development environment and playground for UI components. The tool enables users to create components independently and showcase components interactively in an isolated development environment.

`$ npm run storybook`

## Running Jest

> Jest is used by Facebook to test all JavaScript code including React applications.

In order to run tests:

`$ npm run test`

In order to update snapshots:

`$ npm run test -- -u`

## Running Cypress

> Cypress is a next generation front end testing tool built for the modern web.

Cypress mimics user actions in a browser to perform tests such as successfully logging in, creating bounce rules, and deleting bounce rules.

#### Using Json-Server as the Backend

- `$ npm run cypress:open:mock`

#### Using GO Docker Container as the Backend

- `$ npm run cypress:open:localhost`

This opens up a Cypress application containing various tests categorized by pages. Clicking on any of the \*.spec.js files will begin the test.

## Using Docker

Docker can be used to build and run tests. Use the following commands:

#### Unit Test & Build

- `$ docker-compose up`

#### Cypress Test

- `$ docker-compose up -f docker-compose.cypress.yml up`
