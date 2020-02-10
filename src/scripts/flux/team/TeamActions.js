import Dispatcher from '../Dispatcher';
import TeamSource from './TeamSource';
import { FETCH_ALL_TEAMS, UPDATE_ALL_TEAMS, RECYCLE_TEAM_STORE } from '../../utils/Constants';

const TeamActions = {
  fetchAllTeams() {
    Dispatcher.dispatch({
      type: FETCH_ALL_TEAMS,
    });
    return TeamSource.fetchAllTeams(this.updateAllTeams);
  },
  updateAllTeams(data) {
    Dispatcher.dispatch({
      type: UPDATE_ALL_TEAMS,
      data,
    });
  },
  recycleTeam() {
    Dispatcher.dispatch({
      type: RECYCLE_TEAM_STORE,
    });
  },
};

export default TeamActions;
