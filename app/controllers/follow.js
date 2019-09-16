const authService = require('../services/authService')
const followService = require('../services/followService')

const follow = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { userId } = request.body

    await followService.follow(currentUserId, userId)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to follow ...' })
  }
}

const unfollow = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { userId } = request.body

    await followService.unfollow(currentUserId, userId)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to unfollow ...' })
  }
}

module.exports = {
  follow,
  unfollow
}
