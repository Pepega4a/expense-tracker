'use client'

import { useState, useEffect } from 'react'
import { CURRENCIES, getCurrencySymbol } from '@/lib/currency'

type Transaction = {
  amount: number
  type: string
  currency: string
}

type BalanceCardProps = {
  transactions: Transaction[]
  displayCurrency: string
  onCurrencyChange: (currency: string) => void
}

export function BalanceCard({ transactions, displayCurrency, onCurrencyChange }: BalanceCardProps) {
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/exchange-rates')
      .then(res => res.json())
      .then(data => {
        setRates(data.rates)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load rates:', err)
        setLoading(false)
      })
  }, [])

  const convertAmount = (amount: number, fromCurrency: string) => {
    if (!rates || fromCurrency === displayCurrency) return amount

    const fromRate = rates[fromCurrency]
    const toRate = rates[displayCurrency]

    if (!fromRate || !toRate || fromRate === 0) return amount

    const amountInUSD = amount / fromRate
    return amountInUSD * toRate
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0)

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0)

  const balance = income - expenses
  const symbol = getCurrencySymbol(displayCurrency)

  const formatAmount = (amount: number) => {
    if (!isFinite(amount) || isNaN(amount)) return '0.00'

    const MAX_VALUE = 9007199254740991.99
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

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Balance Overview</h2>
        <select
          value={displayCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="
            border
            rounded
            px-3
            py-1
            text-sm
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

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            +{symbol}{formatAmount(income)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            -{symbol}{formatAmount(expenses)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {symbol}{formatAmount(balance)}
          </p>
        </div>
      </div>
    </div>
  )
}