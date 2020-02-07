import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScratchContainer from '../../containers/ScratchContainer';
import ScheduleContainer from '../../containers/ScheduleContainer';

export default () => (
  <Switch>
    <Route exact path='/scratch' component={Scratch} />
    <Route exact path='/schedule' component={Schedule} />
  </Switch>
);

const Scratch = ({ match }) => (
  <main>
    <Route exact path={`${match.url}/`} component={ScratchContainer} />
  </main>
);

const Schedule = ({ match }) => (
  <main>
    <Route exact path={`${match.url}/`} component={ScheduleContainer} />
  </main>
);

// const Scratch = ({ match }) => (
//   <main>
//     <Route exact path={`${match.url}/`} component={ScratchContainer} />
//   </main>
// )
