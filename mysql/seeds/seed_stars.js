exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stars')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('stars').insert([
        { id: '1', user_id: '1', brochure_id: '1' },
        { id: '2', user_id: '1', brochure_id: '2' },
        { id: '3', user_id: '2', brochure_id: '1' },
        { id: '4', user_id: '2', brochure_id: '2' },
        { id: '5', user_id: '3', brochure_id: '1' }
      ])
    })
}
