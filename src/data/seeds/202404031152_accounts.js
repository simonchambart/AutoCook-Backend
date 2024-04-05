const { tables } = require("..")
const Role = require("../../core/roles")

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.account).delete()

        // then add the fresh cities
        await knex(tables.account).insert([
            {
                id: 1,
                userName: "Admin",
                address: "",
                bankDetails: "",
                contactDetails: "",
                email: "delaware@email.com",
                password_hash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
                roles: JSON.stringify([Role.ADMIN]),
                taxIdNumber: null ,

            },
            {
                id: 2,
                userName: "SwiftGroup",
                address: "12th Main Street",
                bankDetails: "BE 22 1201 2123 5004 8",
                contactDetails: "+320486436056",
                email: "SwiftGroup@email.com",
                password_hash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
                roles: JSON.stringify([Role.SUPPLIER]),
                taxIdNumber: 674985243 ,
            },
            {
                id: 3,
                userName: "BrownLLC",
                address: "Mikasalaan 85",
                bankDetails: "BE44 0018 2557 4292",
                contactDetails: "+3254560467",
                email: "BrownLLC@email.com",
                password_hash:
                    "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
                roles: JSON.stringify([Role.CUSTOMER]),
                taxIdNumber: 49049849047 ,
            },
        ])
    },
}
