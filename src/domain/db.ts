import { Alias, Sticker, User } from '@prisma/client'
import { aliases, stickers, users } from '../db'

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
        create: { id: user.id, language: user.language }
    })
}

export async function insertSticker(sticker: Omit<Sticker, 'createdAt'>) {
    return stickers.create({ data: sticker })
}

export async function deleteSticker(id: Sticker['id']) {
    return stickers.delete({ where: { id } })
}

export async function upsertAlias(alias: Alias) {
    return aliases.upsert({
        where: { stickerId: alias.stickerId },
        update: alias,
        create: alias
    })
}

export async function deleteAlias(alias: Alias) {
    return aliases.delete({ where: alias })
}
