const redis = require('../middleware/redis')
const loginService = require('../services/loginService')
const authService = require('../services/authService')
const userService = require('../services/userService')

const login = async (request, response) => {
  try {
    const { authorization } = request.headers
    if (authorization) {
      const id = await authService.getUserId(authorization)
      const user = await userService.getById(id)
      const token = authorization.split(' ')[1]
      return user
        ? response.status(200).json({ user: user, token: token })
        : response.status(401).json({ message: 'Failed to login ...' })
    }

    const { email, password } = request.body
    const session = await loginService.loginWithVerifyPassword(email, password)
    response.status(200).json(session)
  } catch (e) {
    console.error(e)
    response.status(401).json({ message: 'Failed to login ...' })
  }
}

const logout = async (request, response) => {
  try {
    const { authorization } = request.headers
    if (!authorization)
      return response.status(401).send({ message: 'Unauthorized' })

    const token = authorization.split(' ')[1]
    redis.client.del(token, function(error, reply) {
      reply
        ? response.status(200).json({ success: true })
        : response.status(401).json({ success: false })
    })
  } catch (e) {
    console.error(e)
    response.status(401).json({ message: 'Failed to logout ...' })
  }
}

module.exports = {
  login,
  logout
}
