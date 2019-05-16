import es6Promise from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/routing/Router';
import routes from './components/routing/routes';
import { AppContainer } from 'react-hot-loader';
import '../styles/style.scss'

es6Promise.polyfill();

function render(newRoutes) {
  const app = (
    <AppContainer warnings={false}>
      <Router routes={newRoutes} />
    </AppContainer>
  )
  const contentRoot = document.querySelector('.contents')
  ReactDOM.render(app, contentRoot);
}

function startUp() {
  render(routes);
}

startUp();

if (module.hot) {
  module.hot.accept('./components/routing/routes', () => {
    const newRoutes = require('./components/routing/routes').default
    render(newRoutes)
  })
}