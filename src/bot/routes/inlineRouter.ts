import { Router } from '@grammyjs/router'
import { inlineHandler } from '../handlers'
import { InlineContext } from '../models'

export const inlineRouter = new Router<InlineContext>(() => {
    return 'inline'
})

inlineRouter.route('inline', inlineHandler)
