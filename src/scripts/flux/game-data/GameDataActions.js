import Dispatcher from '../Dispatcher';
import GameDataSource from './GameDataSource';
import {
  RECYCLE_GAME_DATA_STORE,
  FETCH_GAME_DATA,
  UPDATE_GAME_DATA
} from '../../utils/Constants';

const GameDataActions = {
  fetchGameData() {
    Dispatcher.dispatch({
      type: FETCH_GAME_DATA
    });
    return GameDataSource.fetchGameData(this.updateGameData);
  },
  updateGameData(data) {
    Dispatcher.dispatch({
      type: UPDATE_GAME_DATA,
      data
    })
  },
  recycleGameData() {
    Dispatcher.dispatch({
      type: RECYCLE_GAME_DATA_STORE
    });
  }
};

export default GameDataActions;