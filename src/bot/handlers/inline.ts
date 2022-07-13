import { InlineContext } from '../models'

export function inlineHandler(ctx: InlineContext) {
    return ctx.answerInlineQuery([
        {
            type: 'sticker',
            id: '0',
            sticker_file_id:
                'CAACAgIAAxkBAAMXYs6Im7L-__7kzr8W_fFM8MDAPOMAAhcWAAJubeBI8zpwtWeuQIspBA'
        }
    ])
}
