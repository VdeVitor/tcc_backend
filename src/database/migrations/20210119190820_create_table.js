
exports.up = function(knex) {
    return knex.schema.createTable('table', function (table) {
        table.increments();
        table.integer('number').notNullable();
        table.boolean('status').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('table');
};
