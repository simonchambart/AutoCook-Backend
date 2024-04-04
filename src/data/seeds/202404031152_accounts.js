const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.account).delete();

        // then add the fresh cities
        await knex(tables.account).insert([
            {
                id: 1,
                userName: 'Admin',
                email: 'delaware@email.com',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.ADMIN])
            },
            {
                id: 2,
                userName: 'SwiftGroup',
                email: 'SwiftGroup@email.com',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.SUPPLIER])
            },
            {
                id: 3,
                userName: 'BrownLLC',
                email: 'BrownLLC@email.com',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.CUSTOMER])
            },
        ]);
    },
};