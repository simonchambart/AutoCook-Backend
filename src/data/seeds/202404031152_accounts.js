const { tables } = require('..');

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.account).delete();

        // then add the fresh cities
        await knex(tables.account).insert([
            { id: 1, name: 'Simon'},
            { id: 2, name: 'Brent'},
            { id: 3, name: 'Sterre'},
            { id: 4, name: 'Marissa'},
        ]);
    },
};