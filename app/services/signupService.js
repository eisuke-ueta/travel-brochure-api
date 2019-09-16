const uuidv1 = require('uuid/v1')
const loginService = require('../services/loginService')
const emailService = require('../services/emailService')
const userRepository = require('../repositories/userRepository')
const profileRepository = require('../repositories/profileRepository')
const passwordUtil = require('../utils/passwordUtil')

const signup = async form => {
  if (!form.email || !form.name || !form.password) {
    console.warn('Invalid arguments')
    return false
  }

  const user = {
    name: form.name,
    email: form.email,
    password: passwordUtil.generateHash(form.password),
    avatar: '',
    biography: '',
    confirmation_token: uuidv1(),
    confirmation_sent_at: new Date()
  }

  await userRepository.create(user)
  await emailService.sendConfirmSignup(user.email, user.confirmation_token)

  return true
}

const completeSignup = async token => {
  if (!token) {
    console.warn('Invalid arguments, token:' + token)
    return false
  }

  const profile = await profileRepository.getByConfirmToken(token)

  if (!profile) {
    await profileRepository.deleteByConfirmToken(token)
    console.warn('Profile not found, token:' + token)
    return false
  }

  const newProfile = {
    id: profile.id,
    confirmation_token: '',
    confirmed_at: new Date()
  }

  await profileRepository.update(newProfile)
  return loginService.loginWithoutVerifyPassword(profile.email)
}

const resetPassword = async email => {
  if (!email) {
    console.warn('Invalid arguments')
    return false
  }

  const profile = await profileRepository.getByEmail(email)
  if (!profile) {
    console.warn('Profile not found')
    return false
  }

  const newProfile = {
    id: profile.id,
    reset_password_token: uuidv1(),
    reset_password_sent_at: new Date(),
    allow_password_change: true
  }
  await profileRepository.update(newProfile)
  await emailService.sendResetPassword(
    profile.email,
    newProfile.reset_password_token
  )
  return true
}

const changePassword = async (token, password) => {
  if (!token || !password) {
    console.warn('Invalid arguments, token:' + token)
    return false
  }

  const profile = await profileRepository.getByResetToken(token)
  if (!profile) {
    console.warn('Profile not found, token:' + token)
    return false
  }

  const form = {
    id: profile.id,
    password: passwordUtil.generateHash(password),
    allow_password_change: false
  }

  return profileRepository.update(form)
}

module.exports = {
  signup,
  completeSignup,
  resetPassword,
  changePassword
}
