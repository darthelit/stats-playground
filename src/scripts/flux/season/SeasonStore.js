import { fromJS } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import { FETCH_CURRENT_SEASON, UPDATE_CURRENT_SEASON, RECYCLE_SEASON_STORE } from '../../utils/Constants';

class SeasonStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }
  getInitialState() {
    const initialState = fromJS({
      currentSeason: {},
      selectedSeason: {},
    });
    return initialState;
  }

  reduce(state, action) {
    switch (action.type) {
      case FETCH_CURRENT_SEASON:
        return {
          ...state,
          currentSeason: {},
        };
      case UPDATE_CURRENT_SEASON:
        return {
          ...state,
          currentSeaon: action.currentSeason,
        };
      case RECYCLE_SEASON_STORE:
        state = this.getInitialState();
        return state;
      default:
        return state;
    }
  }
}
