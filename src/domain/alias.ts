import { deleteAlias, upsertAlias } from './db'

export async function addAlias(stickerId: string, alias: string) {
    return upsertAlias({ stickerId, alias })
}

export async function removeAlias(stickerId: string, alias: string) {
    return deleteAlias({ stickerId, alias })
}
