import React from 'react';
import { Container } from 'flux/utils';
import TeamStore from '../flux/team/TeamStore';
import ScheduleStore from '../flux/schedule/ScheduleStore';
import ScheduleActions from '../flux/schedule/ScheduleActions';
import SeasonStore from '../flux/season/SeasonStore';
import SeasonActions from '../flux/season/SeasonActions';
import util from '../utils/util';
import '../../styles/style.scss';

class ScheduleContainer extends React.Component {
  static getStores() {
    return [TeamStore, ScheduleStore, SeasonStore];
  }

  static calculateState() {
    return {
      ...TeamStore.getState().toJS(),
      ...ScheduleStore.getState().toJS(),
      ...SeasonStore.getState().toJS()
    };
  }
  componentDidMount() {
    SeasonActions.fetchCurrentSeason(); 
  }
}

export default Container.create(ScheduleContainer);
