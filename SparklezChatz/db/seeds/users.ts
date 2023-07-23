exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'Min',
      message: 'meow',
    },
  ])
}
