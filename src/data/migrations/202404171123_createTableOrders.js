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

            table.integer("customer_userId");
            table.integer("supplier_userId");

            // Give this foreign key a name for better error handling in service layer
            table.foreign('customer_userId', 'fk_customer_account').references(`${tables.account}.id`).onDelete('CASCADE');
            table.foreign('supplier_userId', 'fk_supplier_account').references(`${tables.account}.id`).onDelete('CASCADE');

        })
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.order)
    },
}
