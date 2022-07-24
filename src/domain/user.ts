import { logger } from '../logger'
import { findUser, updateUser, upsertUser } from './db'

export function findOrCreateUser(
    id: number,
    username: string,
    language = 'en'
) {
    logger.info(`User ${id} started bot`)
    return upsertUser({ id, username, language: language, activeSticker: 0 })
}

export async function changeActiveSticker(id: number, stickerId: number) {
    return updateUser(id, { activeSticker: stickerId })
}

export async function getActiveSticker(id: number) {
    const user = await findUser(id)
    if (user && user?.activeSticker !== -1) {
        return user.activeSticker
    }
    return
}
