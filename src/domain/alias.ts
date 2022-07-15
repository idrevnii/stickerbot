import { deleteAlias, insertAlias } from './db'

export async function addAlias(stickerId: number, alias: string) {
    return insertAlias({ stickerId, alias })
}

export async function removeAlias(stickerId: number, alias: string) {
    return deleteAlias({ stickerId, alias })
}
