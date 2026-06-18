import RedisClient from 'ioredis'

const redisConfig = {
    port: 6380,
    host: 'localhost'
}

const redisClient = new RedisClient(redisConfig)

export default redisClient

