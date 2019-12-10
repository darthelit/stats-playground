import {
  fromJS
} from 'immutable';
import {
  ReduceStore
} from 'flux/utils';
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
      gameData: {},
      link: '',
      copyright: '',
      gamePK: undefined,
      liveData: {},
      homePlayers: [],
      awayPlayers: [],
      scoringPlays: [],
      hittingPlays: [],
      blockedShotsPlays: [],
      shotPlays: [],
      missedShotPlays: [],
      faceoffPlays: [],
      takeawayPlays: [],
      giveawayPlays: [],
      penaltyPlays: [],
    });
    return initialState;
  }

  reduce(state, action) {
    switch (action.type) {
      case FETCH_GAME_DATA:
        return state.set('game', {});
      case UPDATE_GAME_DATA:
        state = state.set('gameData', action.data.gameData);
        state = state.set('homePlayers', action.data.homePlayers);
        state = state.set('awayPlayers', action.data.awayPlayers);
        state = state.set('scoringPlays', action.data.scoringPlays);
        state = state.set('hittingPlays', action.data.hittingPlays);
        state = state.set('blockedShotsPlays', action.data.blockedShotsPlays);
        state = state.set('shotPlays', action.data.shotPlays);
        state = state.set('missedShotPlays', action.data.missedShotPlays);
        state = state.set('faceoffPlays', action.data.faceoffPlays);
        state = state.set('takeawayPlays', action.data.takeawayPlays);
        state = state.set('giveawayPlays', action.data.giveawayPlays);
        state = state.set('penaltyPlays', action.data.penaltyPlays);
        state = state.set('liveData', action.data.liveData);
        state = state.set('copyright', action.data.copyright);
        state = state.set('gamePK', action.data.gamePK);
        state = state.set('link', action.data.link);
        return state;
      case RECYCLE_GAME_DATA_STORE:
        state = this.getInitialState();
        return state;
      default:
        return state;
    }
  }
}

export default new GameDataStore();