import axios from 'axios';

export const baseUrl = 'http://localhost:8000/';

const axiosBase = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    validateStatus: function () {
        return true;
    }
});

export const get = async (path) => {
    try {
        const res = await axiosBase.get(path);
        const { data } = await res;
        return data;
    } catch (error) {
        window.postMessage({ notify: ['error', 'try-later'] }, '*');
        return await 0;
    }
}

export const post = async (path, items) => {
    try {
        let form = new FormData();
        for (let key in items) {
            form.append(key, items[key]);
        }
        const res = axiosBase.post(path, form);
        const { data } = await res;
        return data;
    } catch (error) {
        window.postMessage({ notify: ['error', 'try-later'] }, '*');
        return await 0;
    }
}


export default { get, post };