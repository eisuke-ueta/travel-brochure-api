const knex = require('../../mysql/knex.js')

const create = (followUserId, followedUserId) => {
  return knex('follows').insert({
    follow_user_id: followUserId,
    followed_user_id: followedUserId
  })
}

const deleteByUniqueKey = (followUserId, followedUserId) => {
  return knex('follows')
    .where({ follow_user_id: followUserId, followed_user_id: followedUserId })
    .del()
}

module.exports = {
  create,
  deleteByUniqueKey
}
