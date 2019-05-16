import React from 'react';
import { Container } from 'flux/utils';
import {
  filter as _filter,
  map as _map,
  forEach as _forEach
} from 'lodash'
import GameDataActions from '../flux/game-data/GameDataActions';
import GameDataStore from '../flux/game-data/GameDataStore';
import util from '../helpers/util';

import '../../styles/style.scss';

class ScratchContainer extends React.Component {
  static getStores() {
    return [
      GameDataStore
    ];
  }

  static calculateState() {
    return {
      ...GameDataStore.getState().toJS()
    };
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GameDataActions.fetchGameData();
  }

  render() {
    if(!util.isEmpty(this.state.gameData)) {
      const homeTeam = this.state.gameData.gameData.teams.home;
      const awayTeam = this.state.gameData.gameData.teams.away;

      const homePlayers = _filter(this.state.gameData.gameData.players, ['currentTeam.triCode', homeTeam.triCode]);
      const awayPlayers = _filter(this.state.gameData.gameData.players, ['currentTeam.triCode', awayTeam.triCode]);
      const homePlayerOpts = homePlayers.map(player => {
        return <option key={player.id} id={player.id} value={player.id}>{player.fullName}</option>
      });
      const awayPlayerOpts = awayPlayers.map(player => {
        return <option key={player.id} id={player.id} value={player.id}>{player.fullName}</option>
      });



      const scoringPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'GOAL']);
      const goalDetails = scoringPlays.map(goal => {
        const scoringTeam = goal.team.triCode;
        const goalType = goal.result.strength.code === 'EVEN' ? `${goal.result.strength.name} Strength` : goal.result.strength.name;
        const goalScorer =  _filter(goal.players, ['playerType', 'Scorer'])[0];
        const assists = _filter(goal.players, ['playerType', 'Assist']).map(player => player.player.fullName);
        const homeScore = goal.about.goals.home;
        const awayScore = goal.about.goals.away;
        const period = goal.about.ordinalNum;
        const periodTime = goal.about.periodTime;
        const periodTimeRemaining = goal.about.periodTimeRemaining;

        return (
          <div key={goal.result.eventCode}>
            <h3>{scoringTeam} GOAL! | {homeScore} - {awayScore}</h3>
            <span>{period} {periodTimeRemaining}</span> <br />
            <span style={{ fontWeight: 'bold' }}>{goalType}</span><br />
            <span>{goalScorer.player.fullName} </span>
            <span>from {assists.join(', ')}</span>
          </div>
        )
      });


      let playerStats = {};

      const hittingPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'HIT']);
      _forEach(hittingPlays, (play) => {
        const hitter = _filter(play.players, ['playerType', 'Hitter'])[0];
        const hittee = _filter(play.players, ['playerType', 'Hittee'])[0];

        if(util.isEmpty(playerStats[hitter.player.id])) {
          playerStats[hitter.player.id] = {
            id: hitter.player.id,
            fullName: hitter.player.fullName,
            hitterCount: 1,
            hitteeCount: 0
          };
        } else {
          util.isEmpty(playerStats[hitter.player.id].blockedShotsCount) ? playerStats[hitter.player.id].blockedShotsCount = 1 : playerStats[hitter.player.id].hitterCount++;
        }

        if (util.isEmpty(playerStats[hittee.player.id])) {
          playerStats[hitter.player.id] = {
            id: hitter.player.id,
            fullName: hitter.player.fullName,
            hitterCount: 0,
            hitteeCount: 1
          };
        } else {
          util.isEmpty(playerStats[hittee.player.id].blockedShotsCount) ? playerStats[hittee.player.id].blockedShotsCount = 1 : playerStats[hittee.player.id].hitteeCount++;
        }
      });

      const hittingPlaysComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.hitterCount) || !util.isEmpty(player.hitteeCount)){
          return (
            <div key={`${player.id}-hits`}>
              <span>{player.fullName} -- </span>
              {player.hitterCount > 0 ? <span>Hits Given: {player.hitterCount} </span> : ''}
              {player.hitterCount > 0 && player.hitteeCount > 0 ? <span> | </span>: ''}
              {player.hitteeCount > 0 ? <span>Hits Taken: {player.hitteeCount}</span> : ''}
            </div>
          )
        }
      });



      const blockedShotPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'BLOCKED_SHOT']);
      _forEach(blockedShotPlays, (play) => {
        const blocker = _filter(play.players, ['playerType', 'Blocker'])[0];
        const shooter = _filter(play.players, ['playerType', 'Shooter'])[0];

        if(util.isEmpty(playerStats[blocker.player.id])){
          playerStats[blocker.player.id] = {
            id: blocker.player.id,
            fullName: blocker.player.fullName,
            blockedShotsCount: 1,
            shotsBlockedCount: 0
          };
        } else {
          util.isEmpty(playerStats[blocker.player.id].blockedShotsCount) ? playerStats[blocker.player.id].blockedShotsCount = 1 : playerStats[blocker.player.id].blockedShotsCount++;
        }

        if(util.isEmpty(playerStats[shooter.player.id])){
          playerStats[shooter.player.id] = {
            id: shooter.player.id,
            fullName: shooter.player.fullName,
            blockedShotsCount: 0,
            shotsBlockedCount: 1
          };
        } else {
          util.isEmpty(playerStats[shooter.player.id].shotsBlockedCount) ? playerStats[shooter.player.id].shotsBlockedCount = 1 : playerStats[shooter.player.id].shotsBlockedCount++;
        }
      });

      const blockedShotPlaysComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.blockedShotsCount) || !util.isEmpty(player.shotsBlockedCount)){
          return (
            <div key={`${player.id}-blockedShots`}>
              <span>{player.fullName} -- </span>
              {player.blockedShotsCount > 0 ? <span>Blocks (Defender): {player.blockedShotsCount} </span> : ''}
              {player.blockedShotsCount > 0 && player.shotsBlockedCount > 0 ? <span> | </span>: ''}
              {player.shotsBlockedCount > 0 ? <span>Shots Blocked (Shooter): {player.shotsBlockedCount}</span> : ''}
            </div>
          )
        }
      });



      const shotPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'SHOT']);
      const missedShotPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'MISSED_SHOT']);
      _forEach(shotPlays, (play) => {
        const shooter = _filter(play.players, ['playerType', 'Shooter'])[0];

        if(util.isEmpty(playerStats[shooter.player.id])) {
          playerStats[shooter.player.id] = {
            id: shooter.player.id,
            fullName: shooter.player.fullName,
            shotsOnGoal: 1,
            missedShots: 0
          }
        } else {
          util.isEmpty(playerStats[shooter.player.id].shotsOnGoal) ? playerStats[shooter.player.id].shotsOnGoal = 1 : playerStats[shooter.player.id].shotsOnGoal++;
        }
      });
      _forEach(missedShotPlays, (play) => {
        const shooter = _filter(play.players, ['playerType', 'Shooter'])[0];

        if(util.isEmpty(playerStats[shooter.player.id])) {
          playerStats[shooter.player.id] = {
            id: shooter.player.id,
            fullName: shooter.player.fullName,
            shotsOnGoal: 0,
            missedShots: 1
          }
        } else {
          util.isEmpty(playerStats[shooter.player.id].missedShots) ? playerStats[shooter.player.id].missedShots = 1 : playerStats[shooter.player.id].missedShots++;
        }
      });

      const shotPlaysComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.shotsOnGoal) || !util.isEmpty(player.missedShots)){
          return (
            <div key={`${player.id}-shots`}>
              <span>{player.fullName} -- </span>
              {player.shotsOnGoal > 0 ? <span>Shots On Goal: {player.shotsOnGoal} </span> : ''}
              {player.shotsOnGoal > 0 && player.shotsBlockedCount > 0 ? <span> | </span>: ''}
              {player.shotsBlockedCount > 0 ? <span>Shots Blocked: {player.shotsBlockedCount}</span> : ''}
              {player.shotsBlockedCount > 0 && player.missedShots > 0 ? <span> | </span>: ''}
              {player.missedShots > 0 ? <span>Shots Missed: {player.missedShots} </span> : ''}
              {player.shotsOnGoal > 0 || player.missedShots > 0 ? <span style={{ fontWeight: 'bold'}}> || Total Shots Taken: {
                (util.isEmpty(player.shotsOnGoal) ? 0 : player.shotsOnGoal) + (util.isEmpty(player.missedShots) ? 0 : player.missedShots) + (util.isEmpty(player.shotsBlockedCount) ? 0 : player.shotsBlockedCount)
                }</span> : ''}
            </div>
          )
        }
      });



      const faceoffPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'FACEOFF']);
      _forEach(faceoffPlays, (play) => {
        const winner = _filter(play.players, ['playerType', 'Winner'])[0];
        const loser = _filter(play.players, ['playerType', 'Loser'])[0];

        if(util.isEmpty(playerStats[winner.player.id])) {
          playerStats[winner.player.id] = {
            id: winner.player.id,
            fullName: winner.player.fullName,
            faceoffsWon: 1,
            faceoffsLost: 0
          }
        } else {
          util.isEmpty(playerStats[winner.player.id].faceoffsWon) ? playerStats[winner.player.id].faceoffsWon = 1 : playerStats[winner.player.id].faceoffsWon++;
        }

        if(util.isEmpty(playerStats[loser.player.id])) {
          playerStats[loser.player.id] = {
            id: loser.player.id,
            fullName: loser.player.fullName,
            faceoffsWon: 0,
            faceoffsLost: 1
          }
        } else {
          util.isEmpty(playerStats[loser.player.id].faceoffsLost) ? playerStats[loser.player.id].faceoffsLost = 1 : playerStats[loser.player.id].faceoffsLost++;
        }
      });

      const faceoffsComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.faceoffsWon) || !util.isEmpty(player.faceoffsLost)){
          return (
            <div key={`${player.id}-faceoffs`}>
              <span>{player.fullName} -- </span>
              {player.faceoffsWon > 0 ? <span>Faceoffs Won: {player.faceoffsWon} </span> : ''}
              {player.faceoffsWon > 0 && player.faceoffsLost > 0 ? <span> | </span>: ''}
              {player.faceoffsLost > 0 ? <span>Faceoffs Lost: {player.faceoffsLost}</span> : ''}
              {<span style={{ fontWeight: 'bold' }}> || {
                (((util.isEmpty(player.faceoffsWon) ? 0 : player.faceoffsWon) / (
                  (util.isEmpty(player.faceoffsWon) ? 0 : player.faceoffsWon)
                  + 
                  (util.isEmpty(player.faceoffsLost) ? 0 : player.faceoffsLost)
                  )) * 100).toFixed(2)
                }%</span>}
            </div>
          )
        }
      });



      const takeawayPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'TAKEAWAY']);
      _forEach(takeawayPlays, (play) => {
        if(util.isEmpty(playerStats[play.players[0].player.id])) {
          playerStats[play.players[0].player.id] = {
            id: play.players[0].player.id,
            fullName: play.players[0].player.fullName,
            takeaways: 1
          }
        } else {
          util.isEmpty(playerStats[play.players[0].player.id].takeaways) ? playerStats[play.players[0].player.id].takeaways = 1 : playerStats[play.players[0].player.id].takeaways++;
        }
      });

      const takeawayComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.takeaways)) {
          return (
            <div key={`${player.id}-takeaways`}>
              <span>{player.fullName} -- </span>
              {player.takeaways > 0 ? <span>{player.takeaways}</span> : ''}
            </div>
          )
        }
      })



      const giveawayPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'GIVEAWAY']);
      _forEach(giveawayPlays, (play) => {
        if(util.isEmpty(playerStats[play.players[0].player.id])) {
          playerStats[play.players[0].player.id] = {
            id: play.players[0].player.id,
            fullName: play.players[0].player.fullName,
            giveaways: 1
          }
        } else {
          util.isEmpty(playerStats[play.players[0].player.id].giveaways) ? playerStats[play.players[0].player.id].giveaways = 1 : playerStats[play.players[0].player.id].giveaways++;
        }
      });

      const giveawayComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.giveaways)) {
          return (
            <div key={`${player.id}-giveaways`}>
              <span>{player.fullName} -- </span>
              {player.giveaways > 0 ? <span>{player.giveaways}</span> : ''}
            </div>
          )
        }
      });



      const penaltyPlays = _filter(this.state.gameData.liveData.plays.allPlays, ['result.eventTypeId', 'PENALTY']);
      _forEach(penaltyPlays, (play) => {
        const penaltyOn = _filter(play.players, ['playerType', 'PenaltyOn'])[0];
        const drewBy = _filter(play.players, ['playerType', 'DrewBy'])[0];

        if(util.isEmpty(playerStats[penaltyOn.player.id])){
          playerStats[penaltyOn.player.id] = {
            id: penaltyOn.player.id,
            fullName: penaltyOn.player.fullName,
            penaltiesTaken: 1,
            penaltiesDrawn: 0
          }
        } else {
          util.isEmpty(playerStats[penaltyOn.player.id].penaltiesTaken) ? playerStats[penaltyOn.player.id].penaltiesTaken = 1 : playerStats[penaltyOn.player.id].penaltiesTaken++;
        }

        if(!util.isEmpty(drewBy)){
          if(util.isEmpty(playerStats[drewBy.player.id])){
            playerStats[drewBy.player.id] = {
              id: drewBy.player.id,
              fullName: drewBy.player.fullName,
              penaltiesTaken: 0,
              penaltiesDrawn: 1
            }
          } else {
            util.isEmpty(playerStats[drewBy.player.id].penaltiesDrawn) ? playerStats[drewBy.player.id].penaltiesDrawn = 1 : playerStats[drewBy.player.id].penaltiesDrawn++;
          }
        }
      });

      const penaltiesComp = _map(playerStats, (player) => {
        if(!util.isEmpty(player.penaltiesTaken) || !util.isEmpty(player.penaltiesDrawn)){
          return (
            <div key={`${player.id}-faceoffs`}>
              <span>{player.fullName} -- </span>
              {player.penaltiesTaken > 0 ? <span>Penalties Taken: {player.penaltiesTaken} </span> : ''}
              {player.penaltiesTaken > 0 && player.penaltiesDrawn > 0 ? <span> | </span>: ''}
              {player.penaltiesDrawn > 0 ? <span>Penalties Drawn: {player.penaltiesDrawn}</span> : ''}
            </div>
          )
        }
      });

      console.log(playerStats);

      return (
        <>
          <span style={{ fontWeight: 'bold' }}>{homeTeam.name} (Home):</span>
          <br />
          <select>
            {homePlayerOpts}
          </select>

          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>{awayTeam.name} (Away):</span>
          <br />
          <select>
            {awayPlayerOpts}
          </select>
          <br />
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Goals</h2>
            {goalDetails}
          </div>
          <br />
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Hit Count</h2>
            {hittingPlaysComp}
          </div>
          <br />
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Shots Blocked</h2>
            {blockedShotPlaysComp}
          </div>
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Shots</h2>
            {shotPlaysComp}
          </div>
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Faceoffs</h2>
            {faceoffsComp}
          </div>
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Giveaways</h2>
            {giveawayComp}
          </div>
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Takeaways</h2>
            {takeawayComp}
          </div>
          <div>
            <h2 style={{ textDecoration: 'underline'}}>Penalties</h2>
            {penaltiesComp}
          </div>
        </>
      )
    } else {
      return (<span />)
    }
  }
}

export default Container.create(ScratchContainer);