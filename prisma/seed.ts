import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    //test user
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            id: 'test-user-id',
            email: 'test@example.com',
            name: 'Test User',
        },
    });

    //expense category
    const foodCategory = await prisma.category.upsert({
        where: { id: 'test-category-id' },
        update: {},
        create: {
            id: 'test-category-id',
            name: 'Food',
            type: 'expense',
            icon: '🍔',
        },
    })

    await prisma.category.createMany({
        data: [
            { name: 'Transport', type: 'expense', icon: '🚗' },
            { name: 'Entertainment', type: 'expense', icon: '🎬' },
            { name: 'Shopping', type: 'expense', icon: '🛒' },
            { name: 'Salary', type: 'income', icon: '💰' },
            { name: 'Freelance', type: 'income', icon: '💼' },
        ],
    })

    console.log('Database seeded successfully.')
    console.log({ user, foodCategory})
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });