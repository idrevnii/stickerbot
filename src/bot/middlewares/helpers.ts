import { User } from '@grammyjs/types'
import { NextFunction } from 'grammy'
import { IContext } from '../models'

export function getHelpers() {
    return (ctx: IContext, next: NextFunction) => {
        ctx.whois = whois
        return next()
    }
}

const whois = (from?: User) => {
    if (from) {
        const firstName = from.first_name
        const lastName = from.last_name ? ` ${from.last_name}` : ''
        return `${firstName}${lastName}`
    }
    return 'unknown'
}
