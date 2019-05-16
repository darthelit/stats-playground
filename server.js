"use strict";

const express = require('express');
const compression = require('compression');
const path = require('path');

const appBaseUrl = '/nhl-stats'
const app = express();

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('./middleware/webpack');
  app.use(webpack.devMiddleware);
  app.use(webpack.hotModuleMiddleware)
}

app.use(`${appBaseUrl}/styles`, express.static(path.resolve(__dirname, './public/styles')));
app.use(`${appBaseUrl}/node_modules`, express.static(path.resolve(__dirname, './node_modules')));
app.use(`${appBaseUrl}/scripts`, express.static(path.resolve(__dirname, './public/scripts')));
app.use(`${appBaseUrl}/images`, express.static(path.resolve(__dirname, './public/images')));
app.get(`/*`, (req, res) => {
  res.send(generateHtml(appBaseUrl));
});

const generateHtml = (baseUrl) => {
  let title = "NHL Stats";

  //<link class="preload-css" rel="stylesheet" href="https://phoenix-tools.io/assets/cached/velocity/styles/mat0.41.0.css"/>
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=0.75, maximum-scale=1.5, user-scalable=0"/>
            <title>${title}</title>
            <link rel="stylesheet" href="${baseUrl}/styles/style.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        </head>
        <body>
            <div class="nav"></div>
            <div class="contents"></div>
            <script type="text/javascript" src="${baseUrl}/scripts/bundle.js"></script>
        </body>
    </html>
    `
};

app.use('/*', (error, request, response, next) => {
  console.error(error); // handle uncaught errors
  next();
});

const port = parseInt(process.env.PORT || 3269, 10);
const hostname = process.env.NODE_ENV === 'production' ? undefined : '127.0.0.1' // unlike default, only reachable from this machine
const server = app.listen(port, hostname, () => {
  const address = server.address();
  const url = `http://${address.host || 'localhost'}:${port}`;
  console.info(`Listening at ${url}${appBaseUrl}/`);
});