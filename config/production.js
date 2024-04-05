module.exports = {
    log: {
        level: "info",
        disabled: false,
    },
    cors: {
        maxAge: 3 * 60 * 60,
    },
    database: {
        client: "mysql2",
        host: "localhost",
        port: 3306,
        name: "delaware-prod",
    },
    auth: {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            secret: "eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked" /* dit best in de .env.development file zetten voor beveiliging */,
            expirationInterval: 60 * 60 * 1000, // ms (1 hour)
            issuer: "vc-01",
            audience: "vc-01",
        },
    },
}
