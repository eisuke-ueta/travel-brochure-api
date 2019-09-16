const authService = require('../services/authService')
const userService = require('../services/userService')

const getById = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id } = request.query

    const user = await userService.getById(id, currentUserId)
    response.status(200).json({ user: user })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getById ...' })
  }
}

const getFollows = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id, offset, limit } = request.query

    const users = await userService.getFollows(id, currentUserId, offset, limit)
    response.status(200).json({ users: users })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getFollows ...' })
  }
}

const getFollowers = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id, offset, limit } = request.query

    const users = await userService.getFollowers(
      id,
      currentUserId,
      offset,
      limit
    )
    response.status(200).json({ users: users })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getFollowers ...' })
  }
}

const getByRanking = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const result = await userService.getByRanking(currentUserId, request.query)
    response.status(200).json({
      recommendUsers: result.recommendUsers,
      activeUsers: result.activeUsers
    })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getFollowers ...' })
  }
}

module.exports = {
  getById,
  getFollows,
  getFollowers,
  getByRanking
}
