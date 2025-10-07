import { getExchangeRates } from './exchangeRates'

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
]

export async function convertCurrency(
  amount: number, 
  fromCurrency: string, 
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount
  
  const rates = await getExchangeRates()
  
  const amountInUSD = amount / rates[fromCurrency]
  const convertedAmount = amountInUSD * rates[toCurrency]
  
  return convertedAmount
}

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find(c => c.code === code)?.symbol || '$'
}