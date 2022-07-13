import { GrammyError, HttpError } from 'grammy'
import { logger } from '../logger'

export function getErrorHandling() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any) => {
        const ctx = error.ctx
        logger.error(`Error while handling update ${ctx.update.update_id}:`)
        const e = error.error
        if (e instanceof GrammyError) {
            logger.error('Error in request:', e.description)
        } else if (e instanceof HttpError) {
            logger.error('Could not contact Telegram:', JSON.stringify(e))
        } else {
            console.log(e)
            logger.error('Unknown error:', JSON.stringify(e))
        }
    }
}
