import { prisma } from '@/lib/prisma'
import { CurrencyProvider } from '@/components/CurrencyProvider'

export default async function Home() {
  const transactions = await prisma.transaction.findMany({
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return <CurrencyProvider transactions={transactions} categories={categories} />
}