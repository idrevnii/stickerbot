import { Router } from '@grammyjs/router'
import { stickerHandler } from '../handlers'
import { StickerContext } from '../models'

export const stickerRouter = new Router<StickerContext>(() => {
    return 'sticker'
})

stickerRouter.route('sticker', stickerHandler)
