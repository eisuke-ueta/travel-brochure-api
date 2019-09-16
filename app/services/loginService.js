const jwt = require('jsonwebtoken')
const redis = require('../middleware/redis')
const profileService = require('../services/profileService')

const setToken = (key, value) => Promise.resolve(redis.client.set(key, value))

const createSession = async currentUser => {
  const { email, id } = currentUser

  // Issue token
  const jwtPayload = { email }
  const token = jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days' })
  await setToken(token, id)

  return token
}

const handleLogin = async email => {
  const currentUser = await profileService.getByEmail(email)
  if (!currentUser) return null

  return {
    currentUser: currentUser,
    token: await createSession(currentUser)
  }
}

const loginWithVerifyPassword = async (email, password) => {
  const isValid = await profileService.verify(email, password)
  if (!isValid) return null

  return handleLogin(email)
}
const loginWithoutVerifyPassword = async email => {
  return handleLogin(email)
}

module.exports = {
  loginWithVerifyPassword,
  loginWithoutVerifyPassword
}
