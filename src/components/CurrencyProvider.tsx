'use client'

import { useState } from 'react'
import { BalanceCard } from './BalanceCard'
import { TransactionForm } from './TransactionForm'
import { TransactionsList } from './TransactionsList'

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
}

export function CurrencyProvider({ transactions, categories }: Props) {
  const [displayCurrency, setDisplayCurrency] = useState('USD')

  return (
    <main className="min-h-screen text-black p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>
        
        <BalanceCard 
          transactions={transactions} 
          displayCurrency={displayCurrency}
          onCurrencyChange={setDisplayCurrency}
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          <TransactionForm categories={categories} defaultCurrency={displayCurrency} />
          <TransactionsList 
            transactions={transactions} 
            categories={categories} 
            displayCurrency={displayCurrency}
          />
        </div>
      </div>
    </main>
  )
}