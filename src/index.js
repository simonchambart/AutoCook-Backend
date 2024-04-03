const createServer = require('./createServer');

async function main() {
    try {
        //createServer importeren en starten
        const server = await createServer();
        await server.start();

        //luisteren indien het process moet afgesloten worden en dan eventueel afsluiten
        async function onClose() {
            await server.stop();
            process.exit(0);
        }

        process.on('SIGTERM', onClose);
        process.on('SIGQUIT', onClose);
    }
    catch (error){
        console.error(error);
        process.exit(-1);
    }
}
main();