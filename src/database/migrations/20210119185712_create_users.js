exports.up = function(knex) {
   return knex.schema.createTable('users', function (table) {
        table.string('id');
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.boolean('status').notNullable();
        table.string('tipo').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
