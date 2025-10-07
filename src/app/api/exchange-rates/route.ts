import { getExchangeRates } from '@/lib/exchangeRates'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const rates = await getExchangeRates()
    return NextResponse.json({ rates })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rates' },
      { status: 500 }
    )
  }
}

export const revalidate = 3600