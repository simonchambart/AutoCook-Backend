const Koa = require("koa")
const config = require("config")

const { initializeLogger, getLogger } = require("./core/logging")
const { initializeDatabase, shutdownDatabase } = require("./data")
const installRest = require("./rest")
const installMiddleware = require("./core/installMiddleware")

const NODE_ENV = config.get("env")
const LOG_LEVEL = config.get("log.level")
const LOG_DISABLED = config.get("log.disabled")

module.exports = async function createServer() {
    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        isProduction: NODE_ENV === "production",
        defaultMeta: { NODE_ENV },
    })

    await initializeDatabase()

    const app = new Koa()

    installMiddleware(app)

    installRest(app)

    return {
        getApp() {
            return app
        },

        start() {
            return new Promise((resolve) => {
                const port = config.get("port")
                app.listen(port)
                getLogger().info(
                    `🚀 Server listening on http://localhost:${port}`,
                )
                resolve()
            })
        },

        async stop() {
            app.removeAllListeners()
            await shutdownDatabase()
            getLogger().info("Goodbye")
        },
    }
}
