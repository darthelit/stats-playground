import axios from 'axios';
const SeasonSource = {
  async fetchCurrentSeason(callback) {
    const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/seasons/current');
    return callback(data);
  }
}

export default SeasonSource;