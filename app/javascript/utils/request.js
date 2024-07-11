const SERVER_URL = "http://127.0.0.1:3000";

const http = {
    request: async function(method, baseURL, param, data) {
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

        const json = await response.json();
        return json;
    },
    get: async function(baseURL, param) {
        return this.request('GET', baseURL, param, null);
    },
    post: async function(baseURL, param, data) {
        return this.request('POST', baseURL, param, data);
    },
    put: async function(baseURL, param, data) {
        return this.request('PUT', baseURL, param, data);
    },
    patch: async function(baseURL, param, data) {
        return this.request('PATCH', baseURL, param, data);
    },
    delete: async function(baseURL, param, data) {
        return this.request('DELETE', baseURL, param, data);
    },

    upload: async function(method, baseURL, data) {
        let URL = baseURL;
        const response = await fetch(SERVER_URL + URL, {
            method: method,
            headers: {
                'X-CSRF-Token': document.head.querySelector("meta[name=csrf-token]")?.content
            },
            body: data
        });

        const json = await response.json();
        return json;
    }
}

export default http;