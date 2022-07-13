import type { Context as BaseContext, Filter } from 'grammy'
import type { I18nContextFlavor } from '@grammyjs/i18n/dist/source'
import type { ParseModeContext } from '@grammyjs/parse-mode'
import type { User as TelegramUser } from '@grammyjs/types'

type HelpersContext = {
    whois: (from?: TelegramUser) => string
}

export type IContext = BaseContext &
    I18nContextFlavor &
    ParseModeContext &
    HelpersContext

export type TextContext = Filter<IContext, 'message:text'>

export type InlineContext = Filter<IContext, 'inline_query'>
