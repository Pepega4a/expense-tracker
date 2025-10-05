import { createTransaction } from "./actions";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const transactions = await prisma.transaction.findMany({
    include: { category: true },
    orderBy: { date: 'desc' },
  });
  return (
    <main className="min-h-screen text-black p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

            <form action={createTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  className="w-full border rounded px-3 py-2"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Coffee, groceries, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select name="type" className="w-full border rounded px-3 py-2">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Transaction
              </button>
            </form>
          </div>

          {/* Transactions List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

            <div className="space-y-3">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No transactions yet</p>
              ) : (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{transaction.category.icon}</span>
                      <div>
                        <p className="font-medium">{transaction.description || transaction.category.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-semibold ${transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                          }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}