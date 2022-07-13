import { findUser, updateUser, upsertUser } from './db'

export function findOrCreateUser(id: number, language = 'en') {
    return upsertUser({ id, language: language, activeSticker: '0' })
}

export async function changeActiveSticker(id: number, stickerId: string) {
    return updateUser(id, { activeSticker: stickerId })
}

export async function getActiveSticker(id: number) {
    const user = await findUser(id)
    if (user && user?.activeSticker !== '0') {
        return user.activeSticker
    }
    return
}
