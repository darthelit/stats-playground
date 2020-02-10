import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScratchContainer from '../../containers/ScratchContainer';
import ScheduleContainer from '../../containers/ScheduleContainer';
import LandingContainer from '../../containers/LandingContainer';

export default () => (
  <Switch>
    <Route exact path='/scratch' component={Scratch} />
    <Route exact path='/schedule' component={Schedule} />
    <Route exact path='/' component={Landing} />
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

const Landing = ({ match }) => (
  <main>
    <Route exact path={`${match.url}/`} component={LandingContainer} />
  </main>
);

// const Scratch = ({ match }) => (
//   <main>
//     <Route exact path={`${match.url}/`} component={ScratchContainer} />
//   </main>
// )
