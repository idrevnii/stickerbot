import { Router } from '@grammyjs/router'
import { aliasConfirmedHandler, stickerDeleteHandler } from '../handlers'
import { CallbackContext } from '../models'

export const callbackRouter = new Router<CallbackContext>((ctx) => {
    if (ctx.callbackQuery.data === 'alias_confirmed') {
        return 'alias_confirmed'
    }
    const regex = /^sticker_delete:(.+)$/
    const match = ctx.callbackQuery.data.match(regex)
    if (match) {
        return 'sticker_delete'
    }
})

callbackRouter.route('alias_confirmed', aliasConfirmedHandler)

callbackRouter.route('sticker_delete', stickerDeleteHandler)
