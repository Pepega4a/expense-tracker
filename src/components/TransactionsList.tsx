'use client'

import { useState } from 'react'
import { deleteTransaction, updateTransaction } from '@/app/actions'
import { Trash2, Pencil } from 'lucide-react'
import { EditTransactionModal } from './EditTransactionModal'

type Transaction = {
  id: string
  amount: number
  description: string | null
  date: Date
  type: string
  categoryId: string
  category: {
    name: string
    icon: string | null
  }
}

type Category = {
  id: string
  name: string
  type: string
  icon: string | null
}

type Props = {
  transactions: Transaction[]
  categories: Category[]
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

export function TransactionsList({ transactions, categories }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const itemsPerPage = 5

  const filteredTransactions = transactions.filter(t => {
    const typeMatch = selectedType === 'all' || t.type === selectedType
    const categoryMatch = selectedCategory === 'all' || t.categoryId === selectedCategory
    return typeMatch && categoryMatch
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedTransactions = filteredTransactions.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this transaction?')) {
      await deleteTransaction(id)
    }
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleSave = async (id: string, formData: FormData) => {
    await updateTransaction(id, formData)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions
          {filteredTransactions.length !== transactions.length && (
            <span className="text-sm text-gray-500 ml-2">
              ({filteredTransactions.length})
            </span>
          )}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1 text-gray-600">Type</label>
            <select 
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="
                w-full
                border
                rounded
                px-3
                py-2
                text-sm
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            >
              <option value="all">All</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-gray-600">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="
                w-full
                border
                rounded
                px-3
                py-2
                text-sm
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
              "
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-3 min-h-[400px]">
          {displayedTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {filteredTransactions.length === 0 ? 'No transactions match the filters' : 'No transactions yet'}
            </p>
          ) : (
            displayedTransactions.map((transaction, index) => (
              <div 
                key={transaction.id}
                className="
                  flex
                  items-center
                  justify-between
                  p-3
                  border
                  rounded
                  hover:bg-gray-50
                  hover:shadow-md
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  animate-fadeIn
                  group
                "
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl transition-transform duration-200 hover:scale-125">
                    {transaction.category.icon}
                  </span>
                  <div>
                    <p className="font-medium">{transaction.description || transaction.category.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`
                    font-semibold
                    transition-colors
                    duration-200
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="p-2 hover:bg-blue-50 rounded text-blue-600"
                      aria-label="Edit transaction"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 hover:bg-red-50 rounded text-red-600"
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                bg-white
                border
                rounded
                hover:bg-gray-50
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
                duration-200
                hover:shadow-md
                hover:scale-105
                active:scale-95
              "
            >
              ← Previous
            </button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                bg-white
                border
                rounded
                hover:bg-gray-50
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
                duration-200
                hover:shadow-md
                hover:scale-105
                active:scale-95
              "
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          categories={categories}
          onClose={() => setEditingTransaction(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}