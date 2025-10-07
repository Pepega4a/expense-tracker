'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { CURRENCIES } from '@/lib/currency'

type Transaction = {
  id: string
  amount: number
  description: string | null
  type: string
  categoryId: string
  currency: string
}

type Category = {
  id: string
  name: string
  type: string
  icon: string | null
}

type Props = {
  transaction: Transaction
  categories: Category[]
  onClose: () => void
  onSave: (id: string, formData: FormData) => Promise<void>
}

export function EditTransactionModal({ transaction, categories, onClose, onSave }: Props) {
  const [selectedType, setSelectedType] = useState(transaction.type)
  const filteredCategories = categories.filter(cat => cat.type === selectedType)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await onSave(transaction.id, formData)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-transparent dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">Edit Transaction</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X size={20} className="text-black dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              defaultValue={transaction.categoryId}
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
                defaultValue={transaction.amount}
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
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Currency</label>
              <select
                name="currency"
                defaultValue={transaction.currency}
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
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Description</label>
            <input
              type="text"
              name="description"
              defaultValue={transaction.description || ''}
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
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                px-4
                py-2
                border
                border-gray-300
                dark:border-gray-600
                rounded
                hover:bg-gray-50
                dark:hover:bg-gray-700
                text-black
                dark:text-white
                transition-colors
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                flex-1
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-2
                rounded
                transition-colors
              "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}