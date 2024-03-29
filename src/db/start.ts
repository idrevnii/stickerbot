import { PrismaClient } from '@prisma/client'
import { logger } from '../logger'

const prisma = new PrismaClient()

export const users = prisma.user

export const stickers = prisma.sticker

export const aliases = prisma.alias

export const transaction = prisma.$transaction.bind(prisma)

export async function startDatabase() {
    return prisma
        .$connect()
        .then(() => logger.info('Database connected!'))
        .catch((error: unknown) =>
            logger.error(`Error with database connection: ${error}`)
        )
}

export async function stopDatabase() {
    return prisma.$disconnect()
}
