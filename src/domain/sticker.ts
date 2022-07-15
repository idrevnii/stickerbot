import Fuse from 'fuse.js'
import { logger } from '../logger'
import { deleteSticker, findAllAliases, findSticker, insertSticker } from './db'
import { changeActiveSticker } from './user'

export async function addSticker(
    userId: number,
    file_id: string,
    file_id_unique: string
) {
    return insertSticker({ userId, file_id, file_id_unique })
}

export async function removeSticker(stickerId: number) {
    return deleteSticker(stickerId)
}

export async function tryToRemoveSticker(
    userId: number,
    file_id_unique: string
) {
    const sticker = await findSticker(file_id_unique)
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
