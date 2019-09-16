const authService = require('../services/authService')
const starService = require('../services/starService')

const star = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id } = request.body

    await starService.star(currentUserId, id)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to star ...' })
  }
}

const unstar = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)
    const { id } = request.body

    await starService.unstar(currentUserId, id)
    response.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to unstar ...' })
  }
}

module.exports = {
  star,
  unstar
}
