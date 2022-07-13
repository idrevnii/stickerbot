import { findOrCreateUser } from '../../domain'
import { TextContext } from '../models'

export async function startHandler(ctx: TextContext) {
    const userId = ctx.from.id
    const language = ctx.from.language_code || 'en'
    await findOrCreateUser(userId, language)
    return ctx.reply(ctx.i18n.t('start'))
}
