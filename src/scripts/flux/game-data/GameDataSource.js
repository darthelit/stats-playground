import axios from 'axios';
import {
  filter as _filter,
  forEach as _forEach
} from 'lodash';
// import gameData from '../../../data/Blues_Jets_Game_1.js';

// Game 1 vs. Winnipeg
// 'http://statsapi.web.nhl.com/api/v1/game/2018030161/feed/live'

const GameDataSource = {
  async fetchGameData(callback) {
    // axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030323/feed/live')
    //   .then(data => {
    //     gameData = data.data;
    //   });
    // const {data} = await axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030412/feed/live');
    const { data } = await axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030417/feed/live');

    // return callback(data.data);

    const homeTeam = data.gameData.teams.home;
    const awayTeam = data.gameData.teams.away;

    const homePlayers = [];
    const awayPlayers = [];

    _forEach(data.gameData.players, player => {
      if (player.currentTeam) {
        if (player.currentTeam.id === homeTeam.id) {
          homePlayers.push(player);
        } else if (player.currentTeam.id === awayTeam.id) {
          awayPlayers.push(player);
        }
      }
    });

    // data['homePlayers'] = homePlayers;
    // data['awayPlayers'] = awayPlayers;

    // return callback(data);

    const scoringPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'GOAL']);
    const hittingPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'HIT']);
    const blockedShotsPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'BLOCKED_SHOT']);
    const shotPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'SHOT']);
    const missedShotPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'MISSED_SHOT']);
    const faceoffPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'FACEOFF']);
    const takeawayPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'TAKEAWAY']);
    const giveawayPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'GIVEAWAY']);
    const penaltyPlays = _filter(data.liveData.plays.allPlays, ['result.eventTypeId', 'PENALTY']);


    return callback({
      gameData: data.gameData,
      liveData: data.liveData,
      copyright: data.copyright,
      gamePK: data.gamePk,
      link: data.link,
      homePlayers,
      awayPlayers,
      scoringPlays,
      hittingPlays,
      blockedShotsPlays,
      shotPlays,
      missedShotPlays,
      faceoffPlays,
      takeawayPlays,
      giveawayPlays,
      penaltyPlays,
    });
  }
}

export default GameDataSource;