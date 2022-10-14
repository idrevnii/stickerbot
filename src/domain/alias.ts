import { logger } from '../logger'
import { deleteAlias, insertAlias } from './db'
import { changeBulkAlias, getActiveBulkAlias } from './user'

export async function addAlias(stickerId: number, alias: string) {
    return insertAlias({ stickerId, alias })
}

export async function removeAlias(stickerId: number, alias: string) {
    return deleteAlias({ stickerId, alias })
}

export async function isBulkAliasing(userId: number) {
    const bulkAlias = await getActiveBulkAlias(userId)
    return !!bulkAlias
}

export async function startBulkAliasing(id: number, bulkAlias: string) {
    logger.info(`Started bulk aliasing by user ${id} (alias: ${bulkAlias})`)
    return changeBulkAlias(id, bulkAlias)
}

export async function endBulkAliasing(id: number) {
    logger.info(`Ended bulk aliasing by user ${id}`)
    return changeBulkAlias(id, null)
}
