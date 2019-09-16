const knex = require('../../mysql/knex.js')
const starModel = require('../models/starModel')

const create = (userId, brochureId) => {
  return knex('stars').insert({ user_id: userId, brochure_id: brochureId })
}

const deleteByUniqueKey = async (userId, brochureId) => {
  return knex('stars')
    .where({ user_id: userId, brochure_id: brochureId })
    .del()
}

const getBrochureIds = async condition => {
  // Set default values
  let { offset, limit, isPublic, order, userId } = condition
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '10'
  isPublic = isPublic !== undefined ? isPublic : true
  order = order !== undefined ? order : 'desc'
  userId = userId !== undefined ? userId : null

  // Build query
  const queryBuilder = knex
    .select('stars.brochure_id')
    .from('stars')
    .leftJoin('brochures', 'stars.brochure_id', 'brochures.id')
  if (userId) queryBuilder.where('stars.user_id', userId)
  if (isPublic) queryBuilder.where('brochures.is_public', isPublic)

  return await queryBuilder
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('stars.created_at', order)
    .then(stars => {
      return stars.map(star => {
        return star.brochure_id
      })
    })
}

const getBrochureIdsByRanking = async (brochureIds, condition) => {
  // Set default values
  let { offset, limit } = condition
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '3'

  // Build query
  const queryBuilder = knex
    .select(starModel.columnsByRanking())
    .from('stars')
    .leftJoin('brochures', 'stars.brochure_id', 'brochures.id')

  return await queryBuilder
    .whereIn('stars.brochure_id', brochureIds)
    .groupBy('stars.brochure_id')
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('num', 'desc')
    .then(stars => {
      return stars.map(star => {
        return star.brochure_id
      })
    })
}

module.exports = {
  create,
  deleteByUniqueKey,
  getBrochureIds,
  getBrochureIdsByRanking
}
