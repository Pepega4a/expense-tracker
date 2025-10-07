const CACHE_KEY = 'exchange_rates'
const CACHE_DURATION = 24 * 60 * 60 * 1000

type ExchangeRates = {
  rates: Record<string, number>
  timestamp: number
}

const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  RUB: 92.5,
  JPY: 149.5,
  CNY: 7.24,
}

export async function getExchangeRates(): Promise<Record<string, number>> {
  const cached = global.exchangeRatesCache as ExchangeRates | undefined
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Using cached rates:', cached.rates)
    return cached.rates
  }

  try {
    console.log('Fetching exchange rates...')
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('API response:', data)
    
    const rates = {
      USD: 1,
      EUR: data.rates.EUR || FALLBACK_RATES.EUR,
      GBP: data.rates.GBP || FALLBACK_RATES.GBP,
      RUB: data.rates.RUB || FALLBACK_RATES.RUB,
      JPY: data.rates.JPY || FALLBACK_RATES.JPY,
      CNY: data.rates.CNY || FALLBACK_RATES.CNY,
    }

    console.log('Processed rates:', rates)

    global.exchangeRatesCache = {
      rates,
      timestamp: Date.now()
    }

    return rates
  } catch (error) {
    console.error('Failed to fetch exchange rates, using fallback:', error)
    return FALLBACK_RATES
  }
}

declare global {
  var exchangeRatesCache: ExchangeRates | undefined
}