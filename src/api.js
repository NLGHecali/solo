import axios from 'axios';

export function createApi() {
    return axios.create({
        baseURL: 'http://localhost:3000',
    });
}

const api = createApi();
export default api;
