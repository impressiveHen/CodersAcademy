This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

## Deployment
### `Running locally`
`git clone git@github.com:impressiveHen/CodersAcademy.git`

To run the application <br />
`yarn install` <br />
`yarn start` <br />

`cd server` <br />
`yarn install` <br />
`yarn start` <br />

Access the application on [http://localhost:3000](http://localhost:3000) to view in the browser.

### `Deploy to Heroku`
1. Create React app
`npx create-react-app my-app` <br />

2. Create NodeJs Express Application in directory `server` <br />

3. Change package.json in React app to 
`
"scripts": {
  "start-client": "react-scripts start",
  "build": "react-scripts build && (cd server && yarn install)",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "start": "cd server && yarn start"
}
` <br />

4. Add in server/server.js
`
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
` <br />

5. run `yarn build`

6. Deploy to Heroku
`
git add .
git commit -s -m "first commit"
heroku create <app-name>
git push heroku master
` <br />





