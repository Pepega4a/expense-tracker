'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTransaction(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string)
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const categoryId = formData.get('categoryId') as string
  const date = formData.get('date') as string
  const currency = formData.get('currency') as string || 'USD'

  try {
    await prisma.transaction.create({
      data: {
        amount,
        description,
        type,
        userId: 'test-user-id',
        categoryId,
        date: new Date(date),
        currency,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Error creating transaction:', error)
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting transaction:', error)
  }
}

export async function updateTransaction(transactionId: string, formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string)
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const categoryId = formData.get('categoryId') as string
  const currency = formData.get('currency') as string || 'USD'

  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        amount,
        description,
        type,
        categoryId,
        currency,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Error updating transaction:', error)
  }
}