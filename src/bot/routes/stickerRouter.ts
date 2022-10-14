import { Router } from '@grammyjs/router'
import { isBulkAliasing } from '../../domain/alias'
import { stickerBulkAliasingHandler, stickerHandler } from '../handlers'
import { StickerContext } from '../models'

export const stickerRouter = new Router<StickerContext>(async (ctx) => {
    if (ctx.from) {
        const isBulk = await isBulkAliasing(ctx.from.id)
        if (isBulk) {
            return 'stickerBulkAliasing'
        }
    }
    return 'sticker'
})

stickerRouter.route('sticker', stickerHandler)

stickerRouter.route('stickerBulkAliasing', stickerBulkAliasingHandler)
