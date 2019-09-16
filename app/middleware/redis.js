const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);

// FIXME You will want to update your host to the proper address in production
const client = redis.createClient(process.env.REDIS_URI);

module.exports = {
  client: client
};
