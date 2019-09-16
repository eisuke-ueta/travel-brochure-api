const uuidv1 = require('uuid/v1')
const knex = require('../../mysql/knex.js')
const brochureModel = require('../models/brochureModel')

const getByCondition = async (currentUserId, condition) => {
  // Set default values
  let { keyword, offset, limit, isPublic, userId, order } = condition
  keyword = keyword !== undefined ? keyword : ''
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '10'
  isPublic = isPublic !== undefined ? isPublic : true
  order = order !== undefined ? order : 'desc'
  userId = userId !== undefined ? userId : null

  // Update values
  isPublic = userId !== currentUserId

  // Build query
  const queryBuilder = knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
  if (isPublic) queryBuilder.where('is_public', isPublic)
  if (keyword)
    queryBuilder.where(function() {
      this.orWhere('title', 'like', '%' + keyword + '%').orWhere(
        'overview',
        'like',
        '%' + keyword + '%'
      )
    })
  if (userId) queryBuilder.where('user_id', userId)

  // Get results
  return queryBuilder
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('created_at', order)
    .then(brochures => {
      return brochures.map(brochure => brochureModel.convertToDto(brochure))
    })
}

const getByIds = async (currentUserId, ids) => {
  return knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
    .whereIn('id', ids)
    .then(brochures => {
      return brochures.map(brochure => {
        return brochureModel.convertToDto(brochure)
      })
    })
}

const getByShareId = async (currentUserId, shareId) => {
  return knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
    .where('share_id', shareId)
    .first()
    .then(brochure => {
      return brochure ? brochureModel.convertToDto(brochure) : null
    })
}

const getById = async (currentUserId, id) => {
  return knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
    .where('id', id)
    .first()
    .then(brochure => {
      return brochure ? brochureModel.convertToDto(brochure) : null
    })
}

const getByCreatedAt = async currentUserId => {
  const nowDate = new Date()
  const targetDate = new Date().setMonth(nowDate.getMonth() - 1)

  return knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
    .where('is_public', true)
    .where('created_at', '<=', nowDate)
    .where('created_at', '>=', targetDate)
    .then(brochures => {
      return brochures.map(brochure => {
        return brochureModel.convertToDto(brochure)
      })
    })
}

const getUserIdsByRanking = async (userIds, condition) => {
  // Set default values
  let { offset, limit } = condition
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '3'

  return await knex
    .select(brochureModel.columnsByRanking())
    .from('brochures')
    .whereIn('user_id', userIds)
    .groupBy('user_id')
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('num', 'desc')
    .then(brochures => {
      return brochures.map(brochure => brochure.user_id)
    })
}

const getActiveUserIds = async (currentUserId, condition) => {
  // Set default values
  let { offset, limit } = condition
  offset = offset !== undefined ? offset : '0'
  limit = limit !== undefined ? limit : '3'

  return await knex
    .select(brochureModel.columns(currentUserId))
    .from('brochures')
    .where('is_public', true)
    .offset(parseInt(offset))
    .limit(parseInt(limit))
    .orderBy('created_at', 'desc')
    .then(brochures => {
      return brochures.map(brochure => brochure.user_id)
    })
}

const update = (currentUserId, form) => {
  const brochure = brochureModel.convertToEntity(currentUserId, form)
  brochure.updated_at = new Date()

  return knex('brochures')
    .where({ id: brochure.id })
    .update(brochure)
    .then(result => {
      return result
    })
}

const create = async (currentUserId, form) => {
  const brochure = brochureModel.convertToEntity(currentUserId, form)
  brochure.share_id = uuidv1()

  const results = await knex('brochures').insert(brochure)
  return results.length !== 0 ? results[0] : null
}

const deleteById = id => {
  return knex('brochures')
    .where({ id })
    .del()
}

module.exports = {
  getByCondition,
  getByIds,
  getByShareId,
  getById,
  getByCreatedAt,
  getUserIdsByRanking,
  getActiveUserIds,
  update,
  create,
  deleteById
}
