const { tables } = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.clicks).delete();

        await knex(tables.clicks).insert([
            {
                id: 1,
                clickDetails: JSON.stringify(['click1', 'click2', 'click3']),
                createdAt: knex.fn.now()
            },
            {
                id: 2,
                clickDetails: JSON.stringify(['clickA', 'clickB']),
                createdAt: knex.fn.now()
            },
            {
                id: 3,
                clickDetails: JSON.stringify(['clickX', 'clickY', 'clickZ']),
                createdAt: knex.fn.now()
            },
            {
                id: 4,
                clickDetails: JSON.stringify(['clickAlpha', 'clickBeta']),
                createdAt: knex.fn.now()
            },
            {
                id: 5,
                clickDetails: JSON.stringify(['clickOne', 'clickTwo', 'clickThree', 'clickFour']),
                createdAt: knex.fn.now()
            }
        ]);
    },
};
