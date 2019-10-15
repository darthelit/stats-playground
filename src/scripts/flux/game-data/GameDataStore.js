import { fromJS } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import {
  RECYCLE_GAME_DATA_STORE,
  FETCH_GAME_DATA,
  UPDATE_GAME_DATA
} from '../../utils/Constants';

class GameDataStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }
  
  getInitialState() {
    const initialState = fromJS({
      gameData: {}
    });
    return initialState;
  }

  reduce(state, action) {
    switch(action.type){
      case FETCH_GAME_DATA:
        return state.set('gameData', {});
      case UPDATE_GAME_DATA:
        return state.set('gameData', action.gameData);
      case RECYCLE_GAME_DATA_STORE:
        state = this.getInitialState();
        return state;
      default:
        return state;
    }
  }
}

export default new GameDataStore();