import Fuse from 'fuse.js'
import { logger } from '../logger'
import {
    deleteSticker,
    findAllAliases,
    findSticker,
    insertAlias,
    insertSticker
} from './db'
import { changeActiveSticker, getActiveBulkAlias } from './user'

export async function addSticker(
    userId: number,
    stickerId: string,
    uniqueStickerId: string
) {
    return insertSticker({
        userId,
        file_id: stickerId,
        file_id_unique: uniqueStickerId
    })
}

export async function removeSticker(stickerId: number) {
    return deleteSticker(stickerId)
}

export async function tryToRemoveSticker(
    userId: number,
    uniqueStickerId: string
) {
    const sticker = await findSticker(uniqueStickerId)
    if (sticker) {
        return removeSticker(sticker.id)
            .then(() => {
                logger.info(`Sticker ${sticker.id} removed by user ${userId}`)
                return true
            })
            .catch((err) => {
                logger.error(
                    `Could not remove sticker ${sticker.id}, err: ${err}`
                )
                return false
            })
    }
    return false
}

export async function isStickerExists(uniqueId: string) {
    const sticker = await findSticker(uniqueId)
    return !!sticker
}

export async function startProcessingSticker(
    userId: number,
    stickerId: string,
    uniqueStickerId: string
) {
    const sticker = await addSticker(userId, stickerId, uniqueStickerId)
    await changeActiveSticker(userId, sticker.id)
    logger.info(`New sticker added by user ${userId} (stickerId: ${stickerId})`)
}

export async function endProcessingSticker(userId: number) {
    await changeActiveSticker(userId, 0)
    logger.info(`Sticker processing ended by user ${userId}`)
}

export async function queryStickersByAlias(userId: number, alias: string) {
    logger.info(`User (${userId}) started query by alias ${alias}`)
    const stickersWithAliases = await findAllAliases(userId)
    const fuse = new Fuse(stickersWithAliases, { keys: ['aliases.alias'] })
    const result = fuse.search(alias)
    return result
}

export async function upsertStickerWithBulkAlias(
    userId: number,
    stickerId: string,
    uniqueStickerId: string
) {
    const activeBulkAlias = await getActiveBulkAlias(userId)
    if (activeBulkAlias) {
        let sticker = await findSticker(uniqueStickerId)
        if (!sticker) {
            sticker = await addSticker(userId, stickerId, uniqueStickerId)
        }
        logger.info(
            `Add bulk alias ${activeBulkAlias} to sticker ${sticker.id}`
        )
        return insertAlias({ stickerId: sticker.id, alias: activeBulkAlias })
    }
    return false
}
