const authService = require('../services/authService')
const brochureService = require('../services/brochureService')

const get = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const brochures = await brochureService.get(currentUserId, request.query)
    response.status(200).json({ brochures })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to get ...' })
  }
}

const getByRanking = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const result = await brochureService.getByRanking(
      currentUserId,
      request.query
    )
    response.status(200).json({
      starBrochures: result.starBrochures,
      favoriteBrochures: result.favoriteBrochures
    })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getRanking ...' })
  }
}

const getByShareId = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const brochure = await brochureService.getByShareId(
      currentUserId,
      request.query.shareId
    )
    response.status(200).json({ brochure })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getByShareId ...' })
  }
}

const getById = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const brochure = await brochureService.getById(
      currentUserId,
      request.query.id
    )
    response.status(200).json({ brochure: brochure })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to getById ...' })
  }
}

const update = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const result = await brochureService.update(
      currentUserId,
      request.body.form
    )
    response.status(200).json({ id: request.body.form.id })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to update ...' })
  }
}

const create = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    const result = await brochureService.create(
      currentUserId,
      request.body.form
    )
    response.status(200).json({ id: result })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to create ...' })
  }
}

const deleteById = async (request, response) => {
  try {
    const { id } = request.body
    const result = await brochureService.deleteById(id)
    response.status(200).json({ success: result })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to deleteById ...' })
  }
}

module.exports = {
  get,
  getByShareId,
  getByRanking,
  getById,
  update,
  create,
  deleteById
}
