'use client'

import { createTransaction } from '@/app/actions'
import { useState } from 'react'
import { CURRENCIES } from '@/lib/currency'

type Category = {
  id: string
  name: string
  type: string
  icon: string | null
}

type Props = {
  categories: Category[]
  defaultCurrency: string
}

export function TransactionForm({ categories, defaultCurrency }: Props) {
  const [selectedType, setSelectedType] = useState('expense')
  const filteredCategories = categories.filter(cat => cat.type === selectedType)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700 border border-transparent dark:border-gray-700 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Add Transaction</h2>
      
      <form action={createTransaction} className="space-y-4 flex-1 flex flex-col">
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Type</label>
          <select 
            name="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              rounded
              px-3
              py-2
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              transition-all
              duration-200
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
            "
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Category</label>
          <select 
            name="categoryId"
            required
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              rounded
              px-3
              py-2
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              transition-all
              duration-200
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
            "
          >
            <option value="">Select category</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Amount</label>
            <input 
              type="number" 
              name="amount"
              step="0.01"
              required
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                rounded
                px-3
                py-2
                bg-white
                dark:bg-gray-700
                text-black
                dark:text-white
                transition-all
                duration-200
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Currency</label>
            <select 
              name="currency"
              defaultValue={defaultCurrency}
              key={defaultCurrency}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                rounded
                px-3
                py-2
                bg-white
                dark:bg-gray-700
                text-black
                dark:text-white
                transition-all
                duration-200
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Date</label>
          <input 
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            required
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              rounded
              px-3
              py-2
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              transition-all
              duration-200
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
            "
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Description</label>
          <input 
            type="text"
            name="description"
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              rounded
              px-3
              py-2
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              transition-all
              duration-200
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
            "
            placeholder="Coffee, groceries, etc."
          />
        </div>
        
        <button 
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-2
            rounded
            transition-all
            duration-200
            hover:shadow-lg
            hover:scale-[1.02]
            active:scale-95
            mt-auto
          "
        >
          Add Transaction
        </button>
      </form>
    </div>
  )
}