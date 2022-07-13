import { InlineKeyboard } from 'grammy'
import { addAlias, endProcessingSticker, getActiveSticker } from '../../domain'
import { CallbackContext, TextContext } from '../models'

export async function aliasHandler(ctx: TextContext) {
    const activeStickerId = await getActiveSticker(ctx.from.id)
    if (activeStickerId) {
        const alias = ctx.message.text
        await addAlias(activeStickerId, alias)
        const inlineKeyboard = new InlineKeyboard().text(
            ctx.i18n.t('alias_confirmed'),
            'alias_confirmed'
        )
        return ctx.reply(ctx.i18n.t('alias_added'), {
            reply_markup: inlineKeyboard
        })
    }
}

export async function aliasConfirmedHandler(ctx: CallbackContext) {
    await endProcessingSticker(ctx.from.id)
    await ctx.answerCallbackQuery()
    return ctx.reply(ctx.i18n.t('sticker_processed'))
}
