const knex = require('../../mysql/knex.js')
const userModel = require('../models/userModel')

const getById = async (userId, currentUserId) => {
  return knex
    .select(userModel.columns(currentUserId))
    .from('users')
    .where({ id: userId })
    .first()
    .then(user => {
      return user ? userModel.convertToDto(user) : null
    })
}

const getByIds = async (userIds, currentUserId) => {
  return knex
    .select(userModel.columns(currentUserId))
    .from('users')
    .whereIn('id', userIds)
    .then(users => {
      return users.map(user => userModel.convertToDto(user))
    })
}

const create = user => {
  return knex('users').insert(user)
}

module.exports = {
  getById,
  getByIds,
  create
}
