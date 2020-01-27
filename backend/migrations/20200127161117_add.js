exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('password_hash');
    table.string('password_salt');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('password_hash');
    table.dropColumn('password_salt');
  });
};
