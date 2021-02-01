
exports.up = function(knex) {
    return knex.schema.createTable('control', function (table) {
        table.increments();
        table.string('owner').notNullable();
        table.integer('table_id').notNullable();
        table.integer('order_id').notNullable();
        table.boolean('status').notNullable();

        table.foreign('table_id').references('id').inTable('table');
        table.foreign('owner').references('id').inTable('users');
        table.foreign('order_id').references('id').inTable('order');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('control')
};
