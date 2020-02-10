import { fromJS } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import { FETCH_ALL_TEAMS, UPDATE_ALL_TEAMS, RECYCLE_TEAM_STORE } from '../../utils/Constants';

class TeamStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    const initialState = fromJS({
      teams: [],
      selectedTeam: {},
      currentTeam: {},
    });
    return initialState;
  }

  reduce(state, action) {
    switch (action.type) {
      case FETCH_ALL_TEAMS:
        return state.set('teams', []);
      case UPDATE_ALL_TEAMS:
        return state.set('teams', action.data.teams);
      case RECYCLE_TEAM_STORE:
        state = this.getInitialState();
        return state;
      default:
        return state;
    }
  }
}

export default new TeamStore();
