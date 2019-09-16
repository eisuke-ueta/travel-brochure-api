const request = require('request')

const sendConfirmEmail = async (email, token) => {
  const option = {
    uri: process.env.GOOGLE_APP_SCRIPT_CONFIRM_EMAIL_URL,
    headers: { 'Content-type': 'application/json' },
    json: true,
    followAllRedirects: true,
    body: {
      email: email,
      url: process.env.BASE_URL + '/setting/confirm_email?token=' + token
    }
  }

  await request.post(option, function(error, response, body) {
    return body
  })
}

const sendConfirmSignup = async (email, token) => {
  const option = {
    uri: process.env.GOOGLE_APP_SCRIPT_CONFIRM_SIGN_UP_URL,
    headers: { 'Content-type': 'application/json' },
    json: true,
    followAllRedirects: true,
    body: {
      email: email,
      url: process.env.BASE_URL + '/signup/complete?token=' + token
    }
  }

  await request.post(option, function(error, response, body) {
    return body
  })
}

const sendResetPassword = async (email, token) => {
  const option = {
    uri: process.env.GOOGLE_APP_SCRIPT_RESET_PASSWORD_URL,
    headers: { 'Content-type': 'application/json' },
    json: true,
    followAllRedirects: true,
    body: {
      email: email,
      url: process.env.BASE_URL + '/password/reset?token=' + token
    }
  }

  await request.post(option, function(error, response, body) {
    return body
  })
}

const sendContactContent = async (email, title, detail) => {
  const option = {
    uri: process.env.GOOGLE_APP_SCRIPT_CONTACT_URL,
    headers: { 'Content-type': 'application/json' },
    json: true,
    followAllRedirects: true,
    body: {
      email: email,
      title: title,
      detail: detail
    }
  }

  await request.post(option, function(error, response, body) {
    return body
  })
}

module.exports = {
  sendConfirmSignup,
  sendConfirmEmail,
  sendResetPassword,
  sendContactContent
}
