const knex = require('../../mysql/knex.js')
const userRepository = require('../repositories/userRepository')
const brochureRepository = require('../repositories/brochureRepository')

const getById = (userId, currentUserId) => {
  if (!userId || !currentUserId) {
    console.warn(
      'Invalid arguments, userId:' + userId + ', currentUserId:' + currentUserId
    )
    return null
  }
  return userRepository.getById(userId, currentUserId)
}

const getByIds = async (userIds, currentUserId) => {
  if (!userIds || !currentUserId) {
    console.warn(
      'Invalid arguments, userIds:' +
        userIds +
        ', currentUserId:' +
        currentUserId
    )
    return null
  }
  return userRepository.getByIds(userIds, currentUserId)
}

const getFollows = async (followUserId, currentUserId, offset, limit) => {
  const follows = await knex
    .select('*')
    .from('follows')
    .where({ follow_user_id: followUserId })
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('created_at', 'desc')

  if (follows.length === 0) return []

  const userIds = follows.map(follow => follow.followed_user_id)
  return getByIds(userIds, currentUserId)
}

const getFollowers = async (followedUserId, currentUserId, offset, limit) => {
  const follows = await knex
    .select('*')
    .from('follows')
    .where({ followed_user_id: followedUserId })
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('created_at', 'desc')

  if (follows.length === 0) return []

  const userIds = follows.map(follow => follow.follow_user_id)
  return getByIds(userIds, currentUserId)
}

const getByRanking = async (currentUserId, condition) => {
  if (!currentUserId || !condition) {
    console.warn(
      'Invalid arguments, currentUserId:' +
        currentUserId +
        ', condition:' +
        condition
    )
    return []
  }

  // Get recommend users
  const brochures = await brochureRepository.getByCreatedAt(currentUserId)
  const userIds = brochures.map(brochure => brochure.user.id)
  const distinctUserIds = [...new Set(userIds)]
  const rankingUserIds = await brochureRepository.getUserIdsByRanking(
    distinctUserIds,
    condition
  )
  const recommendUsers = await userRepository.getByIds(
    rankingUserIds,
    currentUserId
  )

  // Get active users
  const activeUserIds = await brochureRepository.getActiveUserIds(
    currentUserId,
    condition
  )
  const activeUsers = await userRepository.getByIds(
    activeUserIds,
    currentUserId
  )

  return {
    recommendUsers: recommendUsers,
    activeUsers: activeUsers
  }
}

module.exports = {
  getById,
  getByIds,
  getFollows,
  getFollowers,
  getByRanking
}
