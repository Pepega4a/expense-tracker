import { createTransaction } from "./actions";
import { prisma } from "@/lib/prisma";

//components
import { TransactionsList } from "@/components/TransactionsList";

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

        <div className="grid gap-6 md:grid-cols-2">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

            <form action={createTransaction} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  id="type"
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => {
                    const categorySelect = document.getElementById('category') as HTMLSelectElement
                    const options = categorySelect.querySelectorAll('option')
                    options.forEach(option => {
                      const optionType = option.getAttribute('data-type')
                      if (optionType && optionType !== e.target.value && option.value !== '') {
                        option.style.display = 'none'
                      } else {
                        option.style.display = 'block'
                      }
                    })
                    categorySelect.value = ''
                  }}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="categoryId"
                  id="category"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      data-type={category.type}
                      style={{ display: category.type === 'expense' ? 'block' : 'none' }}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

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

          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </main>
  )
}