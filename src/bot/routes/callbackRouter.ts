import { Router } from '@grammyjs/router'
import { aliasConfirmedHandler, stickerDeleteHandler } from '../handlers'
import { bulkAliasingEndHandler } from '../handlers/alias'
import { CallbackContext } from '../models'

export const callbackRouter = new Router<CallbackContext>((ctx) => {
    if (ctx.callbackQuery.data === 'alias_confirmed') {
        return 'aliasConfirmed'
    }
    if (ctx.callbackQuery.data === 'alias_bulk_ended') {
        return 'bulkAliasingEnd'
    }
    const regex = /^sticker_delete:(.+)$/
    const match = ctx.callbackQuery.data.match(regex)
    if (match) {
        return 'stickerDelete'
    }
})

callbackRouter.route('aliasConfirmed', aliasConfirmedHandler)

callbackRouter.route('stickerDelete', stickerDeleteHandler)

callbackRouter.route('bulkAliasingEnd', bulkAliasingEndHandler)
