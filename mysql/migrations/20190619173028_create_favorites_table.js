exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', t => {
    t.bigincrements()
    t.bigint('user_id').notNull()
    t.bigint('brochure_id').notNull()
    t.timestamp('created_at').defaultTo(knex.fn.now())

    t.unique(['user_id', 'brochure_id'])
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
}
