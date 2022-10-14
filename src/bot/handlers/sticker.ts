import { InlineKeyboard } from 'grammy'
import {
    getActiveSticker,
    isStickerExists,
    startProcessingSticker,
    tryToRemoveSticker,
    upsertStickerWithBulkAlias
} from '../../domain'
import { CallbackContext, StickerContext } from '../models'

export async function stickerHandler(ctx: StickerContext) {
    if (ctx.from?.id) {
        const id = ctx.from.id
        const stickerId = ctx.message.sticker.file_id
        const uniqueStickerId = ctx.message.sticker.file_unique_id
        const isAlreadyExists = await isStickerExists(uniqueStickerId)
        if (isAlreadyExists) {
            const inlineKeyboard = new InlineKeyboard().text(
                ctx.i18n.t('sticker_delete'),
                `sticker_delete:${uniqueStickerId}`
            )
            return ctx.reply(ctx.i18n.t('sticker_already_added'), {
                reply_markup: inlineKeyboard
            })
        }
        const isAnotherStickerActive = await getActiveSticker(ctx.from.id)
        if (isAnotherStickerActive) {
            return ctx.reply(ctx.i18n.t('sticker_already_processing'))
        }
        await startProcessingSticker(id, stickerId, uniqueStickerId)
        return ctx.reply(ctx.i18n.t('sticker_added'))
    }
    return ctx.reply(ctx.i18n.t('sticker_error'))
}

export async function stickerDeleteHandler(ctx: CallbackContext) {
    const regex = /^sticker_delete:(.+)$/
    const match = ctx.callbackQuery.data.match(regex)
    if (match) {
        const uniqueStickerId = match[1]
        const result = await tryToRemoveSticker(ctx.from.id, uniqueStickerId)
        if (!result) {
            await ctx.answerCallbackQuery()
            return ctx.answerCallbackQuery(ctx.i18n.t('sticker_not_found'))
        }
        await ctx.answerCallbackQuery()
        return ctx.reply(ctx.i18n.t('sticker_deleted'))
    }
}

export async function stickerBulkAliasingHandler(ctx: StickerContext) {
    if (ctx.from?.id) {
        const id = ctx.from.id
        const stickerId = ctx.message.sticker.file_id
        const uniqueId = ctx.message.sticker.file_unique_id
        const result = await upsertStickerWithBulkAlias(id, stickerId, uniqueId)
        const endKeyboard = new InlineKeyboard().text(
            ctx.i18n.t('alias_bulk_ended'),
            'alias_bulk_ended'
        )
        if (result) {
            return ctx.reply(ctx.i18n.t('alias_bulk_added'), {
                reply_markup: endKeyboard
            })
        }
        return ctx.reply(ctx.i18n.t('alias_bulk_failed'))
    }
}
