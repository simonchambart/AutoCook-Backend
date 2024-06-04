const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.clicks, (table) => {
            table.increments('id').primary();
            table.json('clickDetails').notNullable(); 
            table.timestamp('createdAt').defaultTo(knex.fn.now());
        })
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.clicks),
}
