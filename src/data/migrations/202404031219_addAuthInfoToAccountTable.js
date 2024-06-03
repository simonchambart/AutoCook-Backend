const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.alterTable(tables.account, (table) => {

            table.string("passwordHash").notNullable()
        })
    },
    down: (knex) =>
        knex.schema.alterTable(tables.account, (table) => {
            table.dropColumns("passwordHash")
        }),
}
