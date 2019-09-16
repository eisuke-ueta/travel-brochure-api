exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('follows')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('follows').insert([
        { id: '1', follow_user_id: '1', followed_user_id: '2' },
        { id: '2', follow_user_id: '1', followed_user_id: '3' },
        { id: '3', follow_user_id: '2', followed_user_id: '1' },
        { id: '4', follow_user_id: '2', followed_user_id: '3' },
        { id: '5', follow_user_id: '3', followed_user_id: '1' },
        { id: '6', follow_user_id: '4', followed_user_id: '1' }
      ])
    })
}
