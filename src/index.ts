import { startBot, stopBot } from './bot/app'
import { startDatabase, stopDatabase } from './db'
import { logger } from './logger'

async function gracefulStop() {
    await stopBot()
    await stopDatabase()
}

async function main() {
    await startDatabase()
    await startBot()

    process
        .on('unhandledRejection', (reason) => {
            logger.error(`Rejection: ${reason}`)
        })
        .on('uncaughtException', (err) => {
            logger.error(`Exception: ${err}`)
        })

    process.once('SIGINT', () => gracefulStop())
    process.once('SIGTERM', () => gracefulStop())
}

main()
    .catch((e) => logger.error(e))
    .finally(() => gracefulStop())
