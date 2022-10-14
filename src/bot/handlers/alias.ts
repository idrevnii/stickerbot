import { InlineKeyboard } from 'grammy'
import {
    addAlias,
    endProcessingSticker,
    getActiveBulkAlias,
    getActiveSticker,
    startBulkAliasing,
    endBulkAliasing
} from '../../domain'
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

export async function bulkAliasingStartHandler(ctx: TextContext) {
    const activeAlias = await getActiveBulkAlias(ctx.from.id)
    if (activeAlias) {
        return ctx.reply(ctx.i18n.t('alias_bulk_already_started'))
    }
    const alias = ctx.message.text.split(' ')[1]
    if (!alias) {
        return ctx.reply(ctx.i18n.t('alias_bulk_not_provided'))
    }
    await startBulkAliasing(ctx.from.id, alias)
    return ctx.reply(ctx.i18n.t('alias_bulk_started'))
}

export async function bulkAliasingEndHandler(ctx: CallbackContext) {
    await endBulkAliasing(ctx.from.id)
    await ctx.answerCallbackQuery()
    return ctx.reply(ctx.i18n.t('alias_bulk_ended'))
}
