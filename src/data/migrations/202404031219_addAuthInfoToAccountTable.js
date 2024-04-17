const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.alterTable(tables.account, (table) => {
            table.string("email").notNullable()

            table.string("passwordHash").notNullable()

            table.jsonb("roles").notNullable()

            table.unique("email", "idx_account_email_unique")
        })
    },
    down: (knex) =>
        knex.schema.alterTable(tables.account, (table) => {
            table.dropColumns("email", "passwordHash", "roles")
        }),
}
