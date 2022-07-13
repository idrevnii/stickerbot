import { deleteSticker, insertSticker } from './db'
import { changeActiveSticker } from './user'

export async function addSticker(userId: number, file_id: string) {
    return insertSticker({ userId, id: file_id })
}

export async function removeSticker(file_id: string) {
    return deleteSticker(file_id)
}

export async function startProcessingSticker(
    userId: number,
    stickerId: string
) {
    await addSticker(userId, stickerId)
    await changeActiveSticker(userId, stickerId)
}

export async function endProcessingSticker(userId: number) {
    await changeActiveSticker(userId, '0')
}
