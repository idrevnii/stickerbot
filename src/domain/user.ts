import { logger } from '../logger'
import { findUser, updateUser, upsertUser } from './db'

export function findOrCreateUser(
    id: number,
    username: string,
    language = 'en'
) {
    logger.info(`User ${id} started bot`)
    return upsertUser({
        id,
        username,
        language: language,
        activeSticker: null,
        activeBulkAlias: null
    })
}

export async function changeBulkAlias(id: number, bulkAlias: string | null) {
    return updateUser(id, { activeBulkAlias: bulkAlias })
}

export async function changeActiveSticker(id: number, stickerId: number) {
    return updateUser(id, { activeSticker: stickerId })
}

export async function getActiveSticker(id: number) {
    const user = await findUser(id)
    if (user && user?.activeSticker) {
        return user.activeSticker
    }
    return
}

export async function getActiveBulkAlias(id: number) {
    const user = await findUser(id)
    if (user && user?.activeBulkAlias) {
        return user.activeBulkAlias
    }
    return
}
