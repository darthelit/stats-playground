import axios from 'axios';
const TeamSource = {
  async fetchAllTeams(callback) {
    const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/teams');
    return callback(data);
  },
};

export default TeamSource;