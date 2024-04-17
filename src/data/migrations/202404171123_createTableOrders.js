const { tables } = require("..")

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.order, (table) => {

            table.increments("id");
            table.datetime("deliveryDateTime").notNullable();
            table.datetime("orderDateTime").notNullable();
            table.string("orderStatus",255).notNullable();
            table.integer("paymentMethod").unsigned();
            table.integer("PaymentReminderSent").unsigned();
            table.string("paymentStatus",255).notNullable();
            table.string("city",255);
            table.string("country",255);
            table.integer("houseNumber").unsigned();
            table.integer("postcode").unsigned();
            table.string("street",255).notNullable();

            table.integer("customer_userId").unsigned();
            table.integer("supplier_userId").unsigned();
            table.foreign("customer_userId").references(`${tables.account}.id`).onDelete('CASCADE');
            table.foreign("supplier_userId").references(`${tables.account}.id`).onDelete('CASCADE');

        })
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.order),
}
