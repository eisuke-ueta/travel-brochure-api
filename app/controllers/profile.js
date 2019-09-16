const profileService = require('../services/profileService')
const accountService = require('../services/accountService')
const authService = require('../services/authService')

const get = async (request, response) => {
  try {
    const currentUserId = await authService.getUserId(
      request.headers.authorization
    )

    const profile = await profileService.getProfile(currentUserId)

    response.status(200).json({ user: profile })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to get profile ...' })
  }
}

const update = async (request, response) => {
  try {
    const { form } = request.body
    if (!form)
      return response.status(400).json({ message: 'Incorrect form submission' })

    const profile = await profileService.updateProfile(form, request.file)

    profile
      ? response
          .status(200)
          .json({ message: 'Successfully updated', profile: profile })
      : response.status(400).json({ message: 'Failed to update profile ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to update profile ...' })
  }
}

const changePassword = async (request, response) => {
  try {
    const { form } = request.body
    const currentUserId = await authService.getUserId(
      request.headers.authorization
    )
    if (!form.password || !currentUserId)
      return response.status(400).json({ message: 'Incorrect form submission' })

    const result = await profileService.updatePassword(
      currentUserId,
      form.password
    )

    result
      ? response.status(200).json({ message: 'Successfully updated password' })
      : response.status(400).json({ message: 'Failed to update password ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to changePassword ...' })
  }
}

const changeEmail = async (request, response) => {
  try {
    const { form } = request.body
    const currentUserId = await authService.getUserId(
      request.headers.authorization
    )
    if (!currentUserId || !form.newEmail)
      return response.status(400).json({ message: 'Incorrect form submission' })

    const result = await profileService.changeEmail(
      currentUserId,
      form.newEmail
    )

    result
      ? response.status(200).json({ message: 'Successfully change email' })
      : response.status(400).json({ message: 'Failed to change email ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to change email ...' })
  }
}

const confirmEmail = async (request, response) => {
  try {
    const currentUserId = await authService.getUserId(
      request.headers.authorization
    )
    const { token } = request.body.form
    if (!currentUserId || !token)
      return response.status(400).json({ message: 'Incorrect form submission' })

    const result = await profileService.confirmEmail(currentUserId, token)

    result
      ? response.status(200).json({ message: 'Successfully updated email' })
      : response.status(400).json({ message: 'Failed to confirmEmail ...' })
  } catch (e) {
    console.error(e)
    if (e.code === 'ER_DUP_ENTRY') {
      response.status(409).json({ message: 'Email is already registered ...' })
    } else {
      response.status(400).json({ message: 'Failed to confirmEmail ...' })
    }
  }
}

const deleteAccount = async (request, response) => {
  try {
    const { authorization } = request.headers
    const currentUserId = await authService.getUserId(authorization)

    await accountService.deleteAccount(currentUserId)
    response.status(200).json({ message: 'Successfully updated email' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to delete ...' })
  }
}

module.exports = {
  get,
  update,
  changePassword,
  changeEmail,
  confirmEmail,
  deleteAccount
}
