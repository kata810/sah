/*const { createClient } = require('@redis/client');
const dotenv = require('dotenv');

dotenv.config();

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || 6379;

console.log(`Connecting to Redis at ${host}:${port}`);

const redisClient = createClient({ url: `redis://${host}:${port}` });

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
    process.exit(1);
});

(async () => {
    try {
        await redisClient.connect(); 
        console.log('Connected to Redis...');
        
        // Testiranje Redis konekcije
        await redisClient.set('test_key', 'test_value');
        const value = await redisClient.get('test_key');
        console.log('Get key response:', value);
    } catch (err) {
        console.error('Redis operation error:', err);
    } finally {
        await redisClient.quit(); 
    }
})();*/
const { createClient } = require('@redis/client');
const dotenv = require('dotenv');

dotenv.config();

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || 6379;

console.log(`Connecting to Redis at ${host}:${port}`);

const redisClient = createClient({ url: `redis://${host}:${port}` });

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
    process.exit(1);
});

(async () => {
    try {
        await redisClient.connect(); 
        console.log('Connected to Redis...');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

module.exports = redisClient;



