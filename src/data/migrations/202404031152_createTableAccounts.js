const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.account, (table) => {
            table.increments("id")

            table.string("voornaam", 255).notNullable();

            table.string("achternaam", 255).notNullable();

            table.string("email", 255).notNullable();

            // Give this unique index a name for better error handling in service layer
            table.unique("email", "idx_account_email_unique")
        })
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.account),
}
