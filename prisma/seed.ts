import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            id: 'test-user-id',
            email: 'test@example.com',
            name: 'Test User',
        },
    })

    const categories = [
        { id: 'test-category-id', name: 'Food', type: 'expense', icon: '🍔' },
        { id: 'cat-transport', name: 'Transport', type: 'expense', icon: '🚗' },
        { id: 'cat-entertainment', name: 'Entertainment', type: 'expense', icon: '🎬' },
        { id: 'cat-shopping', name: 'Shopping', type: 'expense', icon: '🛒' },
        { id: 'cat-salary', name: 'Salary', type: 'income', icon: '💰' },
        { id: 'cat-freelance', name: 'Freelance', type: 'income', icon: '💼' },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category,
        })
    }

    console.log('Database seeded!')
    console.log({ user, categoriesCount: categories.length })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })