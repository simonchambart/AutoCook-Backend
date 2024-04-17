const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.account, (table) => {
            table.increments("id")

            table.string("userName", 255).notNullable()

            table.string('address', 255);

            table.string('bankDetails', 255);

            table.string('contactDetails', 255);

            table.bigint('taxIdNumber');

            // Give this unique index a name for better error handling in service layer
            table.unique("userName", "idx_account_name_unique")
        })
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.account),
}
