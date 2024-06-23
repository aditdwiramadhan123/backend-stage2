import { createClient } from 'redis';
import { RedisClientType } from 'redis';

export let redisClient : RedisClientType<any,any,any>;

export async function initializeRedisClient() {
    redisClient = await createClient({
        url:`redis://${process.env.REDIS_URL}`
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

    console.log("redis connected!")
}