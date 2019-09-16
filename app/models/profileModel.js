const knex = require('../../mysql/knex.js')

const FOLLOWS_SUBQUERY =
  '(select count(*) from follows where users.id = follows.follow_user_id) follows'
const FOLLOWERS_SUBQUERY =
  '(select count(*) from follows where users.id = follows.followed_user_id) followers'

const columns = () => {
  const follows_subquery = knex.raw(FOLLOWS_SUBQUERY)
  const followers_subquery = knex.raw(FOLLOWERS_SUBQUERY)
  return [
    'id',
    'name',
    'email',
    'new_email',
    'avatar',
    'biography',
    follows_subquery,
    followers_subquery
  ]
}

const convertToDto = profile => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    newEmail: profile.new_email,
    avatar: profile.avatar,
    biography: profile.biography,
    follows: profile.follows,
    followers: profile.followers
  }
}

module.exports = {
  columns,
  convertToDto
}
