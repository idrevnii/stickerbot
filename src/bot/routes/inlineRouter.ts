import { Router } from '@grammyjs/router'
import { inlineHandler } from '../handlers'
import { InlineContext } from '../models'

export const inlineRouter = new Router<InlineContext>((ctx) => {
    return 'inline'
})

inlineRouter.route('inline', inlineHandler)

inlineRouter.otherwise((ctx) => ctx.reply('Empty route'))
