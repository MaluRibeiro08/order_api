exports.seed = async function (knex) {
  await knex('tbl_item').del() // Deletes ALL existing entries

  await knex('tbl_item').insert([
    {
      external_id_item: '245c6c72-d2e8-4242-a879-8d3a95909f70',
      name_item: 'Bicicleta',
      available_amount: 10
    },
    {
      external_id_item: '8f00bf81-279b-4f1c-a735-92d5eb4cef97',
      name_item: 'Patinete',
      available_amount: 6
    }
  ])
}
