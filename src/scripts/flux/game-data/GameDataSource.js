import axios from 'axios';
// import gameData from '../../../data/Blues_Jets_Game_1.js';

// Game 1 vs. Winnipeg
// 'http://statsapi.web.nhl.com/api/v1/game/2018030161/feed/live'

const GameDataSource = {
  fetchGameData(callback) {
    return axios.get('http://statsapi.web.nhl.com/api/v1/game/2018030323/feed/live')
      .then(data => {
        return callback(data.data);
      });

    // const players = [];

    // gameData.gameData.players.map(player => {
    //   const 
    // })

    // return callback(gameData);
  }
}

export default GameDataSource;