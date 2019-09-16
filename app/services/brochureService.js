const brochureRepository = require('../repositories/brochureRepository')
const starRepository = require('../repositories/starRepository')
const favoriteRepository = require('../repositories/favoriteRepository')

const get = async (currentUserId, condition) => {
  const { onlyStar } = condition

  const type = onlyStar === 'true' ? 'star' : 'default'

  switch (type) {
    case 'star':
      const brochureIds = await starRepository.getBrochureIds(condition)
      return brochureRepository.getByIds(currentUserId, brochureIds)
    default:
      return brochureRepository.getByCondition(currentUserId, condition)
  }
}

const getByRanking = async (currentUserId, condition) => {
  if (!currentUserId || !condition) {
    console.warn(
      'Invalid arguments, currentUserId:' +
        currentUserId +
        ', condition:' +
        condition
    )
    return {}
  }

  const brochures = await brochureRepository.getByCreatedAt(currentUserId)
  let brochureIds = brochures.map(brochure => brochure.id)
  const distinctBrochureIds = [...new Set(brochureIds)]

  brochureIds = await starRepository.getBrochureIdsByRanking(
    distinctBrochureIds,
    condition
  )
  const starBrochures = await brochureRepository.getByIds(
    currentUserId,
    brochureIds
  )

  brochureIds = await favoriteRepository.getBrochureIdsByRanking(
    distinctBrochureIds,
    condition
  )
  const favoriteBrochures = await brochureRepository.getByIds(
    currentUserId,
    brochureIds
  )

  return {
    starBrochures: starBrochures,
    favoriteBrochures: favoriteBrochures
  }
}

const getByShareId = async (currentUserId, shareId) => {
  if (!currentUserId || !shareId) {
    console.warn(
      'Invalid arguments, currentUserId:' +
        currentUserId +
        ', shareId:' +
        shareId
    )
    return null
  }

  return brochureRepository.getByShareId(currentUserId, shareId)
}

const getById = (currentUserId, id) => {
  if (!currentUserId || !id) {
    console.warn(
      'Invalid arguments, currentUserId:' + currentUserId + ', id:' + id
    )
    return null
  }

  return brochureRepository.getById(currentUserId, id)
}

const update = async (currentUserId, form) => {
  if (!currentUserId || !form) {
    console.warn(
      'Invalid arguments, currentUserId:' + currentUserId + ', form:' + form
    )
    return false
  }

  return await brochureRepository.update(currentUserId, form)
}

const create = (currentUserId, form) => {
  if (!currentUserId || !form) {
    console.warn(
      'Invalid arguments, currentUserId:' + currentUserId + ', form:' + form
    )
    return null
  }
  return brochureRepository.create(currentUserId, form)
}

const deleteById = id => {
  if (!id) {
    console.warn('Invalid arguments, id:' + id)
    return false
  }
  return brochureRepository.deleteById(id)
}

module.exports = {
  get,
  getByRanking,
  getByShareId,
  getById,
  update,
  create,
  deleteById
}
