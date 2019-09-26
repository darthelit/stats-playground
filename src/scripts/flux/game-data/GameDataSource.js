import axios from 'axios';
import { forEach as _forEach } from 'lodash';
// import gameData from '../../../data/Blues_Jets_Game_1.js';

// Game 1 vs. Winnipeg
// 'http://statsapi.web.nhl.com/api/v1/game/2018030161/feed/live'

const GameDataSource = {
  async fetchGameData(callback) {
    // axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030323/feed/live')
    //   .then(data => {
    //     gameData = data.data;
    //   });
    const {data} = await axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030412/feed/live');

    // return callback(data.data);

    const homeTeam = data.gameData.teams.home;
    const awayTeam = data.gameData.teams.away;

    const homePlayers = [];
    const awayPlayers = [];

    _forEach( data.gameData.players, player => {
      if (player.currentTeam) {
        if (player.currentTeam.id === homeTeam.id) {
          homePlayers.push(player);
        } else if (player.currentTeam.id === awayTeam.id) {
          awayPlayers.push(player);
        }
      }
    });

    data['homePlayers'] = homePlayers;
    data['awayPlayers'] = awayPlayers;

    return callback(data);
  }
}

export default GameDataSource;