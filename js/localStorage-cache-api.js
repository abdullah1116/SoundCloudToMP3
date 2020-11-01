const cacheFetch = (type, url, key) =>
    new LocalStorageCacheApi({ type, url, key });

class LocalStorageCacheApi {
    constructor(settings, headers) {
        this.settings = settings;

        ['type', 'key', 'url'].forEach(i => {
            if (!this.settings.hasOwnProperty(i)) {
                console.error(i + ' not defined');
            }
        });

        this.now = Date.now();
        this.type = 'fetch-cache-' + settings.type;
        this.getAllData();
        this.headers = headers || {};
        this.expiration = this.settings.expiration || 7 * 24 * 60 * 60 * 1000;
        this.maxCacheLength = this.settings.maxCacheLength || 100;
        return this.getData(this.settings.key);
    }

    getAllData() {
        this.data = null;
        this.allData = [];
        let d = localStorage.getItem(this.type);
        if (d) {
            try {
                d = JSON.parse(d);
                if (Array.isArray(d)) {
                    this.allData = d;
                }
            } catch (error) {}
        }
    }

    /**
     * Asigna timestamp y guarda en localstorage
     * @param {Json} data
     */
    set(key, value) {
        let data = value;

        if (
            this.settings.callback !== undefined &&
            typeof this.settings.callback === 'function'
        ) {
            data = this.settings.callback(value);
        }

        // More info about https://www.html5rocks.com/en/tutorials/offline/quota-research/
        try {
            this.setKey(key, data);
        } catch (domException) {
            console.error(domException);
        }
    }

    setKey(key, data) {
        const expiration = this.now + this.expiration;
        const item = this.findKey(key);
        if (item) {
            item.data = data;
            item.expiration = expiration;
        } else {
            this.allData.unshift({ key, data, expiration });
        }

        if (this.allData.length > this.maxCacheLength) {
            this.allData = this.allData.slice(0, 10);
        }
        localStorage.setItem(this.type, JSON.stringify(this.allData));
    }

    findKey(key) {
        return this.allData.find(i => i.key == key && i.expiration > this.now);
    }

    /**
     * Valida si existen datos guardados segun el identificador
     * @return {Boolean} - true o false
     * https://eslint.org/docs/rules/no-unneeded-ternary
     */
    existsStorage(key) {
        return this.findKey(key) || false;
    }

    /**
     * Consulta al servicio y retorna un data response
     */
    /* eslint-disable dot-notation, dot-location */
    getService(key) {
        return new Promise((resolve, reject) => {
            fetch(this.settings.url.concat(encodeURIComponent(key)), {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
                .then(response => {
                    const type = response.headers
                        .get('Content-Type')
                        .split(';');

                    switch (type[0]) {
                        case 'application/json':
                            response.json().then(data => {
                                this.set(key, data);
                                resolve(data);
                            });
                            break;
                        default:
                            reject();
                            break;
                    }
                })
                .catch(error => {
                    console.error('LocalStorage.getService()', error);
                    reject(error);
                });
        });
    }
    /* eslint-enable */

    /* eslint-disable dot-notation, dot-location */
    getData(key) {
        return new Promise((resolve, reject) => {
            if (this.existsStorage(key) === false) {
                // No existe data storage
                this.getService(key)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                resolve(this.findKey(key).data);
            }
        });
    }
    /* eslint-enable */
}
