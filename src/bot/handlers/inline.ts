import { InlineQueryResult } from 'grammy/out/platform.node'
import { queryStickersByAlias } from '../../domain'
import { InlineContext } from '../models'

export async function inlineHandler(ctx: InlineContext) {
    const result = (
        await queryStickersByAlias(ctx.from.id, ctx.inlineQuery.query)
    ).map<InlineQueryResult>((sticker) => ({
        type: 'sticker',
        id: `${sticker.item.id}`,
        sticker_file_id: sticker.item.file_id
    }))
    return ctx.answerInlineQuery(result)
}
