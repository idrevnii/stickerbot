import { Alias, Sticker, User } from '@prisma/client'
import { aliases, stickers, transaction, users } from '../db'

export async function insertUser(user: Omit<User, 'createdAt'>) {
    return users.create({ data: { ...user } })
}

export async function findUser(id: User['id']) {
    return users.findUnique({ where: { id } })
}

export async function updateUser(id: User['id'], update: Partial<User>) {
    return users.update({ where: { id }, data: update })
}

export async function deleteUser(id: User['id']) {
    return users.delete({ where: { id } })
}

export async function upsertUser(user: Omit<User, 'createdAt'>) {
    return users.upsert({
        where: { id: user.id },
        update: {},
        create: {
            id: user.id,
            username: user.username,
            language: user.language
        }
    })
}

export async function insertSticker(
    sticker: Omit<Sticker, 'id' | 'createdAt'>
) {
    return stickers.create({
        data: sticker
    })
}

export async function findSticker(uniqueId: Sticker['file_id_unique']) {
    return stickers.findUnique({ where: { file_id_unique: uniqueId } })
}

export async function deleteSticker(id: Sticker['id']) {
    const deleteAliases = aliases.deleteMany({
        where: { stickerId: id }
    })
    const deleteSticker = stickers.delete({ where: { id } })
    return transaction([deleteAliases, deleteSticker])
}

export async function insertAlias(alias: Omit<Alias, 'id'>) {
    return aliases.create({ data: alias })
}

export async function deleteAlias(alias: Omit<Alias, 'id'>) {
    return aliases.deleteMany({ where: { stickerId: alias.stickerId } })
}

export async function findAllAliases(userId: User['id']) {
    return stickers.findMany({ where: { userId }, include: { aliases: true } })
}
