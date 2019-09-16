const authService = require('../services/authService')
const favoriteService = require('../services/favoriteService')

const favorite = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id } = request.body

    await favoriteService.favorite(currentUserId, id)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to favorite ...' })
  }
}

const unfavorite = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id } = request.body

    await favoriteService.unfavorite(currentUserId, id)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to unfavorite ...' })
  }
}

module.exports = {
  favorite,
  unfavorite
}
