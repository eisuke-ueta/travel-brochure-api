const knex = require('../../mysql/knex.js')

const FAVORITES_SUBQUERY =
  '(select count(*) from favorites where brochures.id = favorites.brochure_id) favorites'
const STARS_SUBQUERY =
  '(select count(*) from stars where brochures.id = stars.brochure_id) stars'
const IS_FAVORITED_SUBQUERY =
  '(select exists (select * from favorites where favorites.user_id = CURRENT_USER_ID and favorites.brochure_id = brochures.id)) is_favorited'
const IS_STARED_SUBQUERY =
  '(select exists (select * from stars where stars.user_id = CURRENT_USER_ID and stars.brochure_id = brochures.id)) is_stared'
const USER_ID_SUBQUERY =
  '(select id from users where brochures.user_id = users.id) user_id'
const USER_NAME_SUBQUERY =
  '(select name from users where brochures.user_id = users.id) user_name'
const USER_AVATAR_SUBQUERY =
  '(select avatar from users where brochures.user_id = users.id) user_avatar'

const columns = currentUserId => {
  const favorites_subquery = knex.raw(FAVORITES_SUBQUERY)
  const stars_subquery = knex.raw(STARS_SUBQUERY)
  const is_favorited_subquery = knex.raw(
    IS_FAVORITED_SUBQUERY.replace('CURRENT_USER_ID', currentUserId)
  )
  const is_stared_subquery = knex.raw(
    IS_STARED_SUBQUERY.replace('CURRENT_USER_ID', currentUserId)
  )
  userColumns = [
    knex.raw(USER_ID_SUBQUERY),
    knex.raw(USER_NAME_SUBQUERY),
    knex.raw(USER_AVATAR_SUBQUERY)
  ]
  return [
    '*',
    favorites_subquery,
    stars_subquery,
    is_favorited_subquery,
    is_stared_subquery
  ].concat(userColumns)
}

const columnsByRanking = () => {
  const COUNT_QUERY = knex.raw('COUNT(*) as num')
  return ['user_id', COUNT_QUERY]
}

const convertToDto = brochure => {
  return {
    id: brochure.id,
    title: brochure.title,
    overview: brochure.overview,
    theme: brochure.theme,
    isPublic: brochure.is_public,
    days: JSON.parse(brochure.days),
    memo: brochure.memo,
    isShared: brochure.is_shared,
    shareId: brochure.share_id,
    favorites: brochure.favorites,
    stars: brochure.stars,
    isFavorited: brochure.is_favorited,
    isStared: brochure.is_stared,
    user: {
      id: brochure.user_id,
      name: brochure.user_name,
      avatar: brochure.user_avatar
    },
    status: brochure.status,
    createdAt: brochure.created_at,
    updatedAt: brochure.updated_at
  }
}

const convertToEntity = (userId, brochure) => {
  return {
    id: brochure.id,
    title: brochure.title,
    overview: brochure.overview,
    theme: brochure.theme,
    is_public: brochure.isPublic || false,
    days: JSON.stringify(brochure.days),
    memo: brochure.memo || '',
    is_shared: brochure.isShared || false,
    share_id: brochure.shareId,
    user_id: userId,
    status: brochure.status
  }
}

module.exports = {
  columns,
  columnsByRanking,
  convertToDto,
  convertToEntity
}
