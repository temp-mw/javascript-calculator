# calculator WIP

A JavaScript calculator

[Project Outline](https://gitlab.web.fh-kufstein.ac.at/WCIS18/pww-unterlagen/tree/master/uebung)

## Installation

Clone the repository
```
git clone git@gitlab.web.fh-kufstein.ac.at:gunharth/calculator.git
````
cd into the directory
```
cd calculator
````
Install all dependencies. This also installs all dependencies for web and api
```
npm install
```
Start and open the frontend on localhost:3000. Start the backend on localhost:3001.
```
npm start
```

## Code Structure
Separation of frontend (web) and backend (api)

## Development
### Frontend - Folder web
```
npm run dev
```
compiles src/app.js and src/app.scss to the public folder

```
npm run watch
```
starts browsersync on port 3002 (proxying 3000) and listens to changes

```
npm run prod
```
compiles src/app.js and src/app.scss to the public folder for production
