import { User } from '@prisma/client'
import { users } from '../db'

export async function insertUser(user: Omit<User, 'createdAt'>) {
    return users.create({ data: { ...user } })
}

export async function findUser(userId: number) {
    return users.findUnique({ where: { userId } })
}

export async function updateUser(userId: number, update: Partial<User>) {
    return users.update({ where: { userId }, data: update })
}

export async function deleteUser(userId: number) {
    return users.delete({ where: { userId } })
}

export async function upsertUser(user: Omit<User, 'createdAt'>) {
    return users.upsert({
        where: { userId: user.userId },
        update: {},
        create: { userId: user.userId, language: user.language }
    })
}
