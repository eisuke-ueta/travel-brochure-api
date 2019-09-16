const knex = require('../../mysql/knex.js')
const favoriteModel = require('../models/favoriteModel')

const create = (userId, brochureId) => {
  return knex('favorites').insert({ user_id: userId, brochure_id: brochureId })
}

const deleteByUniqueKey = (userId, brochureId) => {
  return knex('favorites')
    .where({ user_id: userId, brochure_id: brochureId })
    .del()
}

const getBrochureIdsByRanking = async (brochureIds, condition) => {
  // Set default values
  let { offset, limit } = condition
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '3'

  // Build query
  const queryBuilder = knex
    .select(favoriteModel.columnsByRanking())
    .from('favorites')
    .leftJoin('brochures', 'favorites.brochure_id', 'brochures.id')

  return await queryBuilder
    .whereIn('favorites.brochure_id', brochureIds)
    .groupBy('favorites.brochure_id')
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('num', 'desc')
    .then(favorites => {
      return favorites.map(favorite => {
        return favorite.brochure_id
      })
    })
}

module.exports = {
  create,
  deleteByUniqueKey,
  getBrochureIdsByRanking
}
