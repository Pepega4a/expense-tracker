'use client'

import { useState, useEffect } from 'react'
import { deleteTransaction, updateTransaction } from '@/app/actions'
import { Trash2, Pencil } from 'lucide-react'
import { EditTransactionModal } from './EditTransactionModal'
import { getCurrencySymbol } from '@/lib/currency'

type Transaction = {
  id: string
  amount: number
  description: string | null
  date: Date
  type: string
  categoryId: string
  currency: string
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
  displayCurrency: string
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const formatAmount = (amount: number) => {
  if (!isFinite(amount) || isNaN(amount)) return '0.00'
  
  const MAX_VALUE = 999999999999.99
  const clampedAmount = Math.min(Math.abs(amount), MAX_VALUE)
  
  if (clampedAmount >= 1000000000) {
    return (clampedAmount / 1000000000).toFixed(2) + 'B'
  }
  if (clampedAmount >= 1000000) {
    return (clampedAmount / 1000000).toFixed(2) + 'M'
  }
  if (clampedAmount >= 1000) {
    return (clampedAmount / 1000).toFixed(2) + 'K'
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(clampedAmount)
}

export function TransactionsList({ transactions, categories, displayCurrency }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  
  const itemsPerPage = 5

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(err => console.error('Failed to load rates:', err))
  }, [])

  const convertAmount = (amount: number, fromCurrency: string) => {
    if (!rates || fromCurrency === displayCurrency) return amount
    
    const fromRate = rates[fromCurrency]
    const toRate = rates[displayCurrency]
    
    if (!fromRate || !toRate || fromRate === 0) return amount
    
    const amountInUSD = amount / fromRate
    return amountInUSD * toRate
  }

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

  const symbol = getCurrencySymbol(displayCurrency)

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700 border border-transparent dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Recent Transactions
          {filteredTransactions.length !== transactions.length && (
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({filteredTransactions.length})
            </span>
          )}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">Type</label>
            <select 
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                rounded
                px-3
                py-2
                text-sm
                bg-white
                dark:bg-gray-700
                text-black
                dark:text-white
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
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                rounded
                px-3
                py-2
                text-sm
                bg-white
                dark:bg-gray-700
                text-black
                dark:text-white
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
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              {filteredTransactions.length === 0 ? 'No transactions match the filters' : 'No transactions yet'}
            </p>
          ) : (
            displayedTransactions.map((transaction, index) => {
              const convertedAmount = convertAmount(transaction.amount, transaction.currency)
              return (
                <div 
                  key={transaction.id}
                  className="
                    flex
                    items-center
                    justify-between
                    p-3
                    pr-16
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded
                    hover:bg-gray-50
                    dark:hover:bg-gray-700
                    hover:shadow-md
                    transition-all
                    duration-200
                    hover:scale-[1.02]
                    animate-fadeIn
                    group
                    relative
                  "
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl transition-transform duration-200 hover:scale-125 flex-shrink-0">
                      {transaction.category.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-black dark:text-white">
                        {transaction.description || transaction.category.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {formatDate(transaction.date)}
                        {transaction.currency !== displayCurrency && (
                          <span className="ml-2 text-xs">
                            (Original: {getCurrencySymbol(transaction.currency)}{formatAmount(transaction.amount)})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`
                      font-semibold
                      transition-colors
                      duration-200
                      min-w-[100px]
                      text-right
                      ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
                    `}>
                      {transaction.type === 'income' ? '+' : '-'}{symbol}{formatAmount(convertedAmount)}
                    </span>
                    <div className="
                      flex
                      gap-1
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-200
                      absolute
                      right-3
                      bg-white
                      dark:bg-gray-800
                      rounded
                      shadow
                      dark:shadow-gray-700
                    ">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded text-blue-600 dark:text-blue-400"
                        aria-label="Edit transaction"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded text-red-600 dark:text-red-400"
                        aria-label="Delete transaction"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="
                px-4
                py-2
                text-sm
                font-medium
                text-black
                dark:text-white
                bg-white
                dark:bg-gray-700
                border
                border-gray-300
                dark:border-gray-600
                rounded
                hover:bg-gray-50
                dark:hover:bg-gray-600
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
            
            <span className="text-sm text-black dark:text-white">
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
                text-black
                dark:text-white
                bg-white
                dark:bg-gray-700
                border
                border-gray-300
                dark:border-gray-600
                rounded
                hover:bg-gray-50
                dark:hover:bg-gray-600
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