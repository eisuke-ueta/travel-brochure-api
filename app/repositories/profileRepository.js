const knex = require('../../mysql/knex.js')
const profileModel = require('../models/profileModel')

const getById = async id => {
  return knex
    .select(profileModel.columns())
    .from('users')
    .where({ id })
    .first()
    .then(user => {
      return user ? profileModel.convertToDto(user) : null
    })
}

const getByEmail = async email => {
  return knex
    .select(profileModel.columns())
    .from('users')
    .where({ email })
    .first()
    .then(user => {
      return user ? profileModel.convertToDto(user) : null
    })
}

const getPasswordByEmail = async email => {
  return knex
    .select(['id', 'password'])
    .from('users')
    .where({ email })
    .first()
}

const getByResetToken = async token => {
  const now = new Date()
  const expiredAt = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)

  return knex
    .select(profileModel.columns())
    .from('users')
    .where({ reset_password_token: token })
    .where('reset_password_sent_at', '<=', now)
    .where('reset_password_sent_at', '>=', expiredAt)
    .first()
    .then(user => {
      if (!user) {
        console.warn('User not found ...')
        return null
      }
      return profileModel.convertToDto(user)
    })
}

const getByConfirmToken = async token => {
  const now = new Date()
  const expiredAt = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)

  return knex
    .select(profileModel.columns())
    .from('users')
    .where({ confirmation_token: token })
    .where('confirmation_sent_at', '<=', now)
    .where('confirmation_sent_at', '>=', expiredAt)
    .first()
    .then(user => {
      return user ? profileModel.convertToDto(user) : null
    })
}

const update = user => {
  user.updated_at = new Date()

  return knex('users')
    .where({ id: user.id })
    .update(user)
}

const deleteByConfirmToken = async token => {
  if (!token) return

  return knex('users')
    .where({ confirmation_token: token })
    .del()
}

module.exports = {
  getById,
  getByEmail,
  getByResetToken,
  getByConfirmToken,
  getPasswordByEmail,
  update,
  deleteByConfirmToken
}
