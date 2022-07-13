import { startProcessingSticker } from '../../domain'
import { StickerContext } from '../models'

export async function stickerHandler(ctx: StickerContext) {
    if (ctx.from?.id) {
        const id = ctx.from.id
        const stickerId = ctx.message.sticker.file_id
        await startProcessingSticker(id, stickerId)
        return ctx.reply(ctx.i18n.t('sticker_added'))
    }
    return ctx.reply(ctx.i18n.t('sticker_error'))
}
