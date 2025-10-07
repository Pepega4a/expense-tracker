const CACHE_KEY = 'exchange_rates'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа

type ExchangeRates = {
  rates: Record<string, number>
  timestamp: number
}

export async function getExchangeRates(): Promise<Record<string, number>> {
  const cached = global.exchangeRatesCache as ExchangeRates | undefined
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rates
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()
    
    const rates = {
      USD: 1,
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
      RUB: data.rates.RUB,
      JPY: data.rates.JPY,
      CNY: data.rates.CNY,
    }

    global.exchangeRatesCache = {
      rates,
      timestamp: Date.now()
    }

    return rates
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)
    
    return {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      RUB: 92.5,
      JPY: 149.5,
      CNY: 7.24,
    }
  }
}

declare global {
  var exchangeRatesCache: ExchangeRates | undefined
}