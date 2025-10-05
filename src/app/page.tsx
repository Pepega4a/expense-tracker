import { createTransaction } from "./actions";

export default function Home() {
  return (
    <main className="min-h-screen text-black p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>
        
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
      </div>
    </main>
  )
}