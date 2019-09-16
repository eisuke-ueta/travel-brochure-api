const emailService = require('../services/emailService')

const send = async (request, response) => {
  try {
    const { form } = request.body
    if (!form || !form.email || !form.title || !form.detail)
      return response.status(400).json({ message: 'Incorrect form submission' })

    await emailService.sendContactContent(form.email, form.title, form.detail)
    response.status(200).json({ message: 'Successfully send message' })
  } catch (e) {
    console.error(e)
    response.status(400).json({ message: 'Failed to send message ...' })
  }
}

module.exports = {
  send
}
