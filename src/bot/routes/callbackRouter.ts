import { Router } from '@grammyjs/router'
import { aliasConfirmedHandler } from '../handlers'
import { CallbackContext } from '../models'

export const callbackRouter = new Router<CallbackContext>((ctx) => {
    if (ctx.callbackQuery.data === 'alias_confirmed') {
        return 'alias_confirmed'
    }
})

callbackRouter.route('alias_confirmed', aliasConfirmedHandler)
