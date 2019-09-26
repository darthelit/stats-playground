import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScratchContainer from '../../containers/ScratchContainer'

export default () => (
  <Switch>
    <Route path="/scratch" component={Scratch} />
  </Switch>
);

const Scratch = ({ match }) => (
  <main>
    <Route exact path={`${match.url}/`} component={ScratchContainer} />
  </main>
);


// const Scratch = ({ match }) => (
//   <main>
//     <Route exact path={`${match.url}/`} component={ScratchContainer} />
//   </main>
// )