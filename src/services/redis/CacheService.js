const autoBind = require('auto-bind');
const redis = require('redis');

class CacheService {
    constructor() {
        this._client = redis.createClient({
            socket: {
                host: process.env.REDIS_SERVER
            }
        });

        this._client.on('error', (error) => {
            console.error(error);
        });

        this._client.connect();

        autoBind(this);
    }

    async set(key, value, expirationInSecond = 3600) {
        await this._client.set(key, value, {
            EX: expirationInSecond
        });
    }

    async get(key) {
        const result = await this._client.get(key);

        if (result === null) throw new Error('Cache tidak ditemukan');

        return result;
    }

    async delete(key) {
        return this._client.del(key);
    }
}

module.exports = CacheService;