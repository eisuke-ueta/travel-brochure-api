const knex = require('../../mysql/knex.js')

const FOLLOWS_SUBQUERY =
  '(select count(*) from follows where users.id = follows.follow_user_id) follows'
const FOLLOWERS_SUBQUERY =
  '(select count(*) from follows where users.id = follows.followed_user_id) followers'
const IS_FOLLOWING_SUBQUERY =
  '(select exists (select * from follows where follows.follow_user_id = CURRENT_USER_ID and follows.followed_user_id = users.id)) is_following'

const columns = current_user_id => {
  const follows_subquery = knex.raw(FOLLOWS_SUBQUERY)
  const followers_subquery = knex.raw(FOLLOWERS_SUBQUERY)
  const is_following_subquery = knex.raw(
    IS_FOLLOWING_SUBQUERY.replace('CURRENT_USER_ID', current_user_id)
  )
  return [
    'id',
    'name',
    'avatar',
    'biography',
    follows_subquery,
    followers_subquery,
    is_following_subquery
  ]
}

const convertToDto = user => {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    biography: user.biography,
    follows: user.follows,
    followers: user.followers,
    isFollowing: user.is_following
  }
}

const convertToEntity = form => {
  return {
    id: form.id,
    name: form.name,
    avatar: form.avatar,
    biography: form.biography
  }
}

module.exports = {
  columns,
  convertToDto
}
