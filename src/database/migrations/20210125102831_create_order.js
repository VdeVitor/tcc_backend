exports.up = function(knex) {
    return knex.schema.createTable('order', function (table) {
         table.increments();
         table.integer('product_id').notNullable();
         table.boolean('status').notNullable();
         table.string('quantity').notNullable();
         table.decimal('value').notNullable();

         table.foreign('product_id').references('id').inTable('product');
     });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('order');
 };
 