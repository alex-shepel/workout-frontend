import Axios from 'axios';
import Defaults from 'api/axios/defaults';

const instance = Axios.create(Defaults);

export default instance;
