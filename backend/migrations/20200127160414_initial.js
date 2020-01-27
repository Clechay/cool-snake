exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('nick');
    table.string('email');
    table.string('code');
    table.json('profile');
    table.unique('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
