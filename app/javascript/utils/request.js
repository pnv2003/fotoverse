const SERVER_URL = railsEnv === 'development' ? 'http://127.0.0.1:3000' : 'https://fotoverse.onrender.com';

const http = {
    request: async function(method, baseURL, param, data, json = true) {
        let URL = baseURL;
        if (param) {
            const keys = Object.keys(param).map(key => key.toString());
            const values = Object.values(param).map(value => value.toString());
            URL += "?" + [...Array(keys.length).keys()].map(index => keys[index] + "=" + values[index]).join("&");
        }

        const response = await fetch(SERVER_URL + URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.head.querySelector("meta[name=csrf-token]")?.content
            },
            body: data ? JSON.stringify(data) : null
        });

        if (json) {
            const json = await response.json();
            return json;
        }
        return response;
    },
    get: async function(baseURL, param, json = true) {
        return this.request('GET', baseURL, param, null, json);
    },
    post: async function(baseURL, param, data, json = true) {
        return this.request('POST', baseURL, param, data, json);
    },
    put: async function(baseURL, param, data, json = true) {
        return this.request('PUT', baseURL, param, data, json);
    },
    patch: async function(baseURL, param, data, json = true) {
        return this.request('PATCH', baseURL, param, data, json);
    },
    delete: async function(baseURL, param, data, json = true) {
        return this.request('DELETE', baseURL, param, data, json);
    },

    upload: async function(method, baseURL, data, json = true) {
        let URL = baseURL;
        const response = await fetch(SERVER_URL + URL, {
            method: method,
            headers: {
                'X-CSRF-Token': document.head.querySelector("meta[name=csrf-token]")?.content
            },
            body: data
        });

        if (json) {
            const json = await response.json();
            return json;
        }
        return response;
    }
};