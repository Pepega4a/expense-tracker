'use client'

import { useState } from 'react'
import { BalanceCard } from './BalanceCard'
import { TransactionForm } from './TransactionForm'
import { TransactionsList } from './TransactionsList'
import { ThemeToggle } from './ThemeToggle'
import { Wallet } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wallet size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-black dark:text-white">
                Expense Tracker
              </h1>
            </div>
            <ThemeToggle />
          </div>

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

          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">Built with Next.js, Prisma, and TypeScript</p>
              <p>
                © {new Date().getFullYear()} Expense Tracker. Created by{' '}
                <a
                  href="https://github.com/Pepega4a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Vsevolod
                </a>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}