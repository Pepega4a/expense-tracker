'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type Transaction = {
  id: string
  amount: number
  description: string | null
  type: string
  categoryId: string
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
      className="
        fixed
        inset-0
        bg-black
        bg-opacity-50
        flex
        items-center
        justify-center
        z-50
      " 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Transaction</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select 
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="
                w-full
                border
                rounded
                px-3
                py-2
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
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              name="categoryId"
              defaultValue={transaction.categoryId}
              required
              className="
                w-full
                border
                rounded
                px-3
                py-2
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            >
              <option value="">Select category</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
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
              defaultValue={transaction.amount}
              required
              className="
                w-full
                border
                rounded
                px-3
                py-2
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input 
              type="text"
              name="description"
              defaultValue={transaction.description || ''}
              className="
                w-full
                border
                rounded
                px-3
                py-2
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
                rounded
                hover:bg-gray-50
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
                text-white
                py-2
                rounded
                hover:bg-blue-700
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