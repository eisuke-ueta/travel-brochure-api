const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const knex = require('../../mysql/knex.js')
const gcp = require('../services/gcp')
const emailService = require('../services/emailService')
const profileRepository = require('../repositories/profileRepository')
const profileModel = require('../models/profileModel')
const passwordUtil = require('../utils/passwordUtil')

const getByEmail = async email => {
  if (!email) {
    console.error('Invalid arguments ...')
    return null
  }
  return profileRepository.getByEmail(email)
}

const update = profile => {
  if (!profile) {
    console.warn('Invalid arguments, profile:' + profile)
    return false
  }
  return profileRepository.update(profile)
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
      if (!user) {
        console.warn('User not found ...')
        return null
      }
      return profileModel.convertToDto(user)
    })
}

const getProfile = async id => {
  return profileRepository.getById(id)
}

const updateProfile = async (form, file = null) => {
  if (!form) {
    console.warn('Invalid arguments, form:' + form)
    return false
  }

  // Upload file
  let destination = null
  if (file) {
    object_path = 'avatar/' + uuidv1() + '.png'
    destination = await gcp.uploadFile(file, object_path)
  }

  // build Profile
  const profile = {
    id: form.id,
    name: form.name,
    avatar: file ? destination : form.avatar,
    biography: form.biography
  }

  await profileRepository.update(profile)
  return profileRepository.getById(form.id)
}

const updatePassword = async (id, password) => {
  const profile = await profileRepository.getById(id)
  if (!profile)
    return response.status(400).json({ message: 'Profile is not found ...' })

  const form = {
    id: profile.id,
    password: passwordUtil.generateHash(password),
    updated_at: new Date()
  }

  return profileRepository.update(form)
}

const changeEmail = async (currentUserId, newEmail) => {
  if (!currentUserId || !newEmail) {
    console.warn('Invalid arguments, currentUserId:' + currentUserId)
    return false
  }

  const profile = {
    id: currentUserId,
    new_email: newEmail,
    confirmation_token: uuidv1(),
    confirmation_sent_at: new Date(),
    confirmed_at: null
  }

  await profileRepository.update(profile)
  await emailService.sendConfirmEmail(
    profile.new_email,
    profile.confirmation_token
  )
  return true
}

const confirmEmail = async (currentUserId, token) => {
  if (!currentUserId || !token) {
    console.error(
      'Invalid arguments, currentUserId:' + currentUserId + ', token:' + token
    )
    return false
  }

  const profile = await profileRepository.getByConfirmToken(token)
  if (!profile || profile.id.toString() !== currentUserId) {
    console.error('Not valied token')
    return false
  }

  // Update token
  const newProfile = {
    id: profile.id,
    email: profile.newEmail,
    new_email: '',
    confirmed_at: new Date()
  }
  return profileRepository.update(newProfile)
}

const verify = async (email, password) => {
  if (!email || !password) {
    console.error('Invalid arguments ...')
    return false
  }

  const profile = await profileRepository.getPasswordByEmail(email)
  if (!profile) {
    console.error('Cannot find profile ...')
    return false
  }
  return bcrypt.compareSync(password, profile.password)
}

const getCurrentUser = id => {
  return profileRepository.getById(id)
}

module.exports = {
  getByEmail,
  getByResetToken,
  getByConfirmToken,
  update,
  getProfile,
  updateProfile,
  updatePassword,
  changeEmail,
  confirmEmail,
  verify,
  getCurrentUser
}
