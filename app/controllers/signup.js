const signupService = require('../services/signupService')

const signup = async (request, response) => {
  try {
    const { form } = request.body
    if (!form.email || !form.name || !form.password) {
      return response.status(400).json({ message: 'Incorrect form submission' })
    }

    const result = await signupService.signup(form)

    result
      ? response.status(200).json({ message: 'Successfully signup' })
      : response.status(400).json({ message: 'Failed to signup ...' })
  } catch (e) {
    console.error(e)
    if (e.code === 'ER_DUP_ENTRY') {
      response.status(409).json({ message: 'Duplicated entry ...' })
    } else {
      response.status(400).json({ message: 'Failed to signup ...' })
    }
  }
}

const completeSignup = async (request, response) => {
  try {
    const { token } = request.body
    if (!token) return response.status(400).json({ message: 'Incorrect token' })

    const session = await signupService.completeSignup(token)

    session
      ? response.status(200).json(session)
      : response.status(400).json({ message: 'Failed to completeSignup ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to completeSignup ...' })
  }
}

const resetPassword = async (request, response) => {
  try {
    const { form } = request.body
    if (!form || !form.email) {
      return response.status(400).json({ message: 'Incorrect form submission' })
    }

    const result = await signupService.resetPassword(form.email)

    result
      ? response.status(200).json({ message: 'Successfully resetPassword' })
      : response.status(400).json({ message: 'Failed to resetPassword ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to resetPassword ...' })
  }
}

const changePassword = async (request, response) => {
  try {
    const { form } = request.body
    if (!form.token || !form.password) {
      return response.status(400).json({ message: 'Incorrect form submission' })
    }

    const result = await signupService.changePassword(form.token, form.password)

    result
      ? response.status(200).json({ message: 'Successfully changePassword' })
      : response.status(400).json({ message: 'Failed to changePassword ...' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to changePassword ...' })
  }
}

module.exports = {
  signup,
  completeSignup,
  resetPassword,
  changePassword
}
