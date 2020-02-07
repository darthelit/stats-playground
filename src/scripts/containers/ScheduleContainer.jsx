import React from 'react';
import { Container } from 'flux/utils';
import GameDataAction from '../flux/game-data/GameDataActions';
import GameDataStore from '../flux/game-data/GameDataStore';
import util from '../utils/util';
import '../../styles/style.scss';

class ScheduleContainer extends React.Component {
  static getStores() {
    return [GameDataStore];
  }

  static calculateState() {
    return {
      ...GameDataStore.getState().toJS(),
    };
  }
}

export default Container.create(ScheduleContainer);
