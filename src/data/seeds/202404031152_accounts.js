const { tables } = require("..")

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.account).delete()

        // then add the fresh cities
        await knex(tables.account).insert([
            {
                id: 1,
                voornaam: "Simon",
                achternaam: "Chambart",
                email: "simon@test.com",
                // password: "12345678"
                passwordHash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
            },
            {
                id: 2,
                voornaam: "Ardit",
                achternaam: "Salijaj",
                email: "ardit@test.com",
                // password: "12345678"
                passwordHash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
            },
            {
                id: 3,
                voornaam: "Zeger",
                achternaam: "Supply",
                email: "zeger@test.com",
                // password: "12345678"
                passwordHash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
            },
            {
                id: 4,
                voornaam: "Matthias",
                achternaam: "Gheysen",
                email: "matthias@test.com",
                // password: "12345678"
                passwordHash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
            },
            {
                id: 5,
                voornaam: "David",
                achternaam: "Vanden Bogaerde",
                email: "david@test.com",
                // password: "12345678"
                passwordHash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
            },
        ])
    },
}
