const knex = require('../../mysql/knex.js')

const deleteAccount = async userId => {
  knex.transaction(async trx => {
    try {
      await trx
        .from('users')
        .where({ id: userId })
        .del()

      await trx
        .from('brochures')
        .where({ user_id: userId })
        .del()

      await trx
        .from('follows')
        .orWhere({ follow_user_id: userId })
        .orWhere({ followed_user_id: userId })
        .del()

      await trx
        .from('favorites')
        .where({ user_id: userId })
        .del()

      await trx
        .from('stars')
        .where({ user_id: userId })
        .del()

      trx.commit
    } catch (e) {
      console.error(e)
      trx.rollback
    }
  })
}

module.exports = {
  deleteAccount
}
