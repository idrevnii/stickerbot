import { InlineContext } from '../models'

export function inlineHandler(ctx: InlineContext) {
    return ctx.answerInlineQuery([
        {
            type: 'article',
            id: '0',
            title: 'test',
            input_message_content: { message_text: 'test' }
        }
    ])
}
