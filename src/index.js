const createServer = require("./createServer")

async function onClose(server) {
    await server.stop()
    process.exit(0)
}

async function main() {
    try {
        const server = await createServer()
        await server.start()

        process.on("SIGTERM", () => onClose(server))
        process.on("SIGQUIT", () => onClose(server))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        process.exit(-1)
    }
}

main()
