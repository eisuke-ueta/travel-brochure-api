const followRepository = require('../repositories/followRepository')

const follow = async (followUserId, followedUserId) => {
  if (!followUserId || !followedUserId) {
    console.warn(
      'Invalid arguments. followUserId:' +
        followUserId +
        ', followedUserId:' +
        followedUserId
    )
    return false
  }
  await followRepository.create(followUserId, followedUserId)
  return true
}

const unfollow = async (followUserId, followedUserId) => {
  if (!followUserId || !followedUserId) {
    console.warn(
      'Invalid arguments. followUserId:' +
        followUserId +
        ', followedUserId:' +
        followedUserId
    )
    return false
  }
  await followRepository.deleteByUniqueKey(followUserId, followedUserId)
}

module.exports = {
  follow,
  unfollow
}
