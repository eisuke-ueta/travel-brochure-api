const favoriteRepository = require('../repositories/favoriteRepository')

const favorite = async (userId, brochureId) => {
  if (!userId || !brochureId) {
    console.warn(
      'Invalid arguments. userId:' + userId + ', brochureId:' + brochureId
    )
    return false
  }
  await favoriteRepository.create(userId, brochureId)
  return true
}

const unfavorite = async (userId, brochureId) => {
  if (!userId || !brochureId) {
    console.warn(
      'Invalid arguments. userId:' + userId + ', brochureId:' + brochureId
    )
    return false
  }
  await favoriteRepository.deleteByUniqueKey(userId, brochureId)
  return true
}

module.exports = {
  favorite,
  unfavorite
}
