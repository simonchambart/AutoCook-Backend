module.exports = {
    port: 9000,
    log: {
        level: "silly",
        disabled: false,
    },
    cors: {
        origins: ["http://localhost:5173"],
        maxAge: 3 * 60 * 60,
    },
    database: {
        host: "127.0.0.1",
        port: 3306,
        name: "delaware",
        client: "mysql2",
    },
    auth: {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            secret: "eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked" /* dit best in de .env.development file zetten voor beveiliging
             */,
            expirationInterval: 60 * 60 * 1000, // ms (1 hour)
            issuer: "vc-01",
            audience: "vc-01",
        },
    },
}
