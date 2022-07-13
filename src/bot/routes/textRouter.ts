import { Router } from '@grammyjs/router'
import { startHandler } from '../handlers'
import { TextContext } from '../models'

export const textRouter = new Router<TextContext>((ctx) => {
    if (ctx.msg.text === '/start') {
        return 'start'
    }
})

textRouter.route('start', startHandler)

textRouter.otherwise((ctx) => ctx.reply('Empty route'))
