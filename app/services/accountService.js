const accountRepository = require('../repositories/accountRepository')

const deleteAccount = async userId => {
  await accountRepository.deleteAccount(userId)
}

module.exports = {
  deleteAccount
}
