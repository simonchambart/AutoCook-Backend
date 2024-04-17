const { join } = require("path")

const knex = require("knex")
const config = require("config")

const { getLogger } = require("../core/logging")

const DATABASE_CLIENT = config.get("database.client")
const DATABASE_HOST = config.get("database.host")
const DATABASE_PORT = config.get("database.port")
const DATABASE_USERNAME = config.get("database.username")
const DATABASE_PASSWORD = config.get("database.password")
const DATABASE_NAME = config.get("database.name")
const NODE_ENV = config.get("env")
const isDevelopment = NODE_ENV === "development"

let knexInstance

const knexLogger = (logger, level) => (message) => {
    if (message.sql) {
        logger.log(level, message.sql)
    } else {
        logger.log(level, JSON.stringify(message))
    }
}

// connection with db, migrating, seeding
const initializeDatabase = async () => {
    const logger = getLogger()
    const knexOptions = {
        client: DATABASE_CLIENT,
        debug: isDevelopment,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
        },
        migrations: {
            tableName: "knex-meta",
            directory: join("src", "data", "migrations"),
        },
        seeds: {
            directory: join("src", "data", "seeds"),
        },
        log: {
            debug: knexLogger(logger, "debug"),
            warn: knexLogger(logger, "warn"),
            error: knexLogger(logger, "error"),
        },
    }
    knexInstance = knex(knexOptions)
    // check if db is up and running
    try {
        await knexInstance.raw("SELECT 1+1 AS result")
        await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`)
        // delete connection and creating a new one
        await knexInstance.destroy()
        knexOptions.connection.database = DATABASE_NAME
        knexInstance = knex(knexOptions)
        await knexInstance.raw("SELECT 1+1 AS result")
    } catch (error) {
        getLogger().error("Error init db", { error })
        throw new Error("Could not initialize the data layer")
    }

    let knexMigrationFailed = true
    try {
        await knexInstance.migrate.latest()
        knexMigrationFailed = false
    } catch (error) {
        getLogger().error("migration failed", { error })
    }

    if (knexMigrationFailed) {
        try {
            await knexInstance.migrate.down()
        } catch (error) {
            getLogger().error("migration failed", { error })
        }
        throw new Error("migration failed")
    }

    if (isDevelopment) {
        try {
            await knexInstance.seed.run()
        } catch (error) {
            getLogger().error("seeding failed", {
                error,
            })
        }
    }
}

async function shutdownDatabase() {
    const logger = getLogger()

    logger.info("Shutting down database connection")

    await knexInstance.destroy()
    knexInstance = null

    logger.info("Database connection closed")
}

function getKnex() {
    if (!knexInstance)
        throw new Error(
            "Please initialize the data layer before getting the Knex instance",
        )
    return knexInstance
}

const tables = Object.freeze({
    account: "accounts",
    order: "orders",
})

module.exports = {
    tables,
    getKnex,
    initializeDatabase,
    shutdownDatabase,
}
