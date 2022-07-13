import { I18n } from '@grammyjs/i18n'

export const i18n = new I18n({
    defaultLanguageOnMissing: true,
    defaultLanguage: 'en',
    directory: './src/bot/locales',
    useSession: false
})

export function getI18n() {
    return i18n.middleware()
}
