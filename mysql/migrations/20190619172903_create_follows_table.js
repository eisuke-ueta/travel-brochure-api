exports.up = function(knex, Promise) {
  return knex.schema.createTable('follows', t => {
    t.bigincrements()
    t.bigint('follow_user_id').notNull()
    t.bigint('followed_user_id').notNull()
    t.timestamp('created_at').defaultTo(knex.fn.now())

    t.unique(['follow_user_id', 'followed_user_id'])
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follows')
}
