import pino from 'pino'

export const logger = (() => {
    if (process.env.NODE_ENV == 'production') {
        return pino({}, pino.destination('logs/combined.log'))
    }
    return pino({
        transport: {
            target: 'pino-pretty'
        }
    })
})()
