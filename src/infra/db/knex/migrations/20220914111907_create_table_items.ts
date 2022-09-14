exports.up = knex => knex.schema.createTable('tbl_item', table => {
  table.increments('id_item').primary().notNullable()
  table.uuid('external_id_item').unique().notNullable()

  table.string('name_item', 50).notNullable()
  table.integer('available_amount').notNullable()
})

exports.down = knex => knex.schema.dropTable('items')
