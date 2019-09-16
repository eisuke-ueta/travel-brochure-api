exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.bigincrements()
    t.string('provider', 100)
      .notNull()
      .defaultTo('email')
    t.string('name', 20).notNull()
    t.string('email', 100)
      .unique()
      .notNull()
    t.string('password', 200).notNull()
    t.string('avatar', 200).notNull()
    t.string('biography', 140).notNull()

    t.string('reset_password_token', 200)
      .notNull()
      .defaultTo('')
    t.timestamp('reset_password_sent_at')
    t.boolean('allow_password_change')
      .notNull()
      .defaultTo(false)

    t.string('new_email', 100)
      .notNull()
      .defaultTo('')
    t.string('confirmation_token', 200)
      .notNull()
      .defaultTo('')
    t.timestamp('confirmation_sent_at')
    t.timestamp('confirmed_at')

    t.timestamps(false, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
