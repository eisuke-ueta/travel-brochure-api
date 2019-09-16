const redis = require('../middleware/redis')

const getUserId = async authorization => {
  const token = authorization.split(' ')[1]
  return await redis.client.getAsync(token)
}

module.exports = {
  getUserId
}
