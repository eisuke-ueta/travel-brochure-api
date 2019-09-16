const bcrypt = require('bcrypt')
const saltRounds = 10

const generateHash = password => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = {
  generateHash
}
