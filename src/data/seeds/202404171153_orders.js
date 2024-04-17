const { tables } = require("..")

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.order).delete()

        // then add the fresh orders
        await knex(tables.order).insert([
            {
                id: 1,
                deliveryDateTime: '2023-04-16 12:00:00',
                orderDateTime: '2023-04-15 10:30:00',
                orderStatus: 'geplaatst',
                paymentMethod: 1,
                PaymentReminderSent: 0,
                paymentStatus: 'pending',
                city: 'Brussels',
                country: 'Belgium',
                houseNumber: 12,
                postcode: 1000,
                street: 'Main Street',
                customer_userId: 1,
                supplier_userId: 2
            },
            {
                id: 2,
                deliveryDateTime: '2023-04-17 14:00:00',
                orderDateTime: '2023-04-16 09:45:00',
                orderStatus: 'verwerkt',
                paymentMethod: 2,
                PaymentReminderSent: 0,
                paymentStatus: 'paid',
                city: 'Antwerp',
                country: 'Belgium',
                houseNumber: 28,
                postcode: 2000,
                street: 'Park Avenue',
                customer_userId: 3,
                supplier_userId: 1
            },
            {
                id: 3,
                deliveryDateTime: '2023-04-19 10:30:00',
                orderDateTime: '2023-04-18 11:15:00',
                orderStatus: 'uit voor levering',
                paymentMethod: 1,
                PaymentReminderSent: 1,
                paymentStatus: 'unpaid',
                city: 'Ghent',
                country: 'Belgium',
                houseNumber: 5,
                postcode: 9000,
                street: 'High Street',
                customer_userId: 2,
                supplier_userId: 3
            },
        ])
    },
}
