module.exports = {
    log: {
        level: 'silly',
        disabled: true
    },
    cors: {
        origins: ['http://localhost:3000'],
        maxAge: 3 * 60 * 60,
    },
    database:{
        host : '127.0.0.1',
        client: 'mysql2',
        port: 3306,
        name: 'delaware_test',
        username: 'root',
        password: '',
    },
    auth : {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',     //dit best in de .env file zetten voor beveiliging
            expirationInterval: 60 * 60 * 1000, // ms (1 hour)
            issuer: 'vc-01',
            audience: 'vc-01',
        },
    }

};