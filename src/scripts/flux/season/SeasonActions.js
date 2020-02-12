import Dispatcher from '../Dispatcher';
import SeasonSource from './SeasonSource';
import { FETCH_CURRENT_SEASON, UPDATE_CURRENT_SEASON, RECYCLE_CURRENT_SEASON } from '../../utils/Constants';

const SeasonActions = {
  fetchCurrentSeason() {
    Dispatcher.dispatch({
      type: FETCH_CURRENT_SEASON,
    });
    return SeasonSource.fetchCurrentSeason(this.updateCurrentSeason);
  },
  updateCurrentSeason(currentSeason) {
    Dispatcher.dispatch({
      type: UPDATE_CURRENT_SEASON,
      currentSeason,
    });
  },
  recycleCurrentSeason() {
    Dispatcher.dispatch({
      type: RECYCLE_CURRENT_SEASON,
    });
  },
};

export default SeasonActions;
