const starRepository = require('../repositories/starRepository')

const star = async (userId, brochureId) => {
  if (!userId || !brochureId) {
    console.warn(
      'Invalid arguments. userId:' + userId + ', brochureId:' + brochureId
    )
    return false
  }
  await starRepository.create(userId, brochureId)
  return true
}

const unstar = async (userId, brochureId) => {
  if (!userId || !brochureId) {
    console.warn(
      'Invalid arguments. userId:' + userId + ', brochureId:' + brochureId
    )
    return false
  }
  await starRepository.deleteByUniqueKey(userId, brochureId)
  return true
}

module.exports = {
  star,
  unstar
}
