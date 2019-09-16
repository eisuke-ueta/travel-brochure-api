const redis = require('../middleware/redis')
const authService = require('../services/authService')
const profileService = require('../services/profileService')

const guard = (request, response, next) => {
  try {
    const { authorization } = request.headers
    if (!authorization)
      return response.status(401).send({ message: 'Unauthorized' })

    const token = authorization.split(' ')[1]
    return redis.client.get(token, (error, reply) => {
      if (error || !reply) {
        return response.status(401).send({ message: 'Unauthorized' })
      }
      return next()
    })
  } catch (e) {
    console.error(e)
    response.status(401).send({ message: 'Failed to guard ...' })
  }
}

const getCurrentUser = async (request, response) => {
  try {
    const userId = await authService.getUserId(request.headers.authorization)
    const profile = await profileService.getCurrentUser(userId)

    response.status(200).json({ currentUser: profile })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getCurrentUser ...' })
  }
}

module.exports = {
  guard,
  getCurrentUser
}
