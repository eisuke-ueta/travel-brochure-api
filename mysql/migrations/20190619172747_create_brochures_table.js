exports.up = function(knex, Promise) {
  return knex.schema.createTable('brochures', t => {
    t.bigincrements()
    t.string('title', 40).notNull()
    t.string('overview', 400).notNull()
    t.string('theme', 20).notNull()
    t.boolean('is_public')
      .notNull()
      .defaultTo(false)
    t.text('days').notNull()
    t.string('memo', 1000).notNull()
    t.boolean('is_shared')
      .notNull()
      .defaultTo(false)
    t.string('share_id', 200).notNull()
    t.bigint('user_id').notNull()
    t.string('status', 20).notNull()
    t.timestamps(false, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('brochures')
}
