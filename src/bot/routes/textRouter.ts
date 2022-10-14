import { Router } from '@grammyjs/router'
import {
    aliasHandler,
    startHandler,
    bulkAliasingStartHandler
} from '../handlers'
import { TextContext } from '../models'

export const textRouter = new Router<TextContext>((ctx) => {
    if (ctx.msg.text === '/start') {
        return 'start'
    }
    if (ctx.msg.text.includes('/alias')) {
        return 'bulkAliasingStart'
    }
})

textRouter.route('start', startHandler)

textRouter.route('bulkAliasingStart', bulkAliasingStartHandler)

textRouter.otherwise(aliasHandler)
