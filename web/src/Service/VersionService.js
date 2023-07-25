import axios from 'axios'

const VERSION_REST_API_URL = process.env.REACT_APP_API_BASE_URL + '/api/version';

class VersionService {

  getVersion() {
    console.log(VERSION_REST_API_URL);
    return axios.get(VERSION_REST_API_URL);
  }

}

const versionService = new VersionService();
export default versionService;
