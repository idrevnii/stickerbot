import { upsertUser } from './db'

export function findOrCreateUser(userId: number, language = 'en') {
    return upsertUser({ userId, language: language })
}
