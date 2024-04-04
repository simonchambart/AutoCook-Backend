const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.account, (table) => {
            table.increments("id")

            table.string("userName", 255).notNullable()

            // Give this unique index a name for better error handling in service layer
            table.unique("userName", "idx_account_name_unique")
        })
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.account)
    },
}
