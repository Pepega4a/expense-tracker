import { createTransaction } from "./actions";
import { prisma } from "@/lib/prisma";

//components
import { TransactionsList } from "@/components/TransactionsList";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionForm } from "@/components/TransactionForm";

export default async function Home() {
  const transactions = await prisma.transaction.findMany({
    include: { category: true },
    orderBy: { date: 'desc' },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return (
    <main className="min-h-screen text-black p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>

        <BalanceCard transactions={transactions} />

        <div className="grid gap-6 md:grid-cols-2">
          <TransactionForm categories={categories} />
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </main>
  )
}