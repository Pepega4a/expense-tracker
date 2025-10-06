'use server'

import {prisma} from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function createTransaction(formData: FormData) {
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const type = formData.get('type') as string
    const categoryId = formData.get('categoryId') as string

    try {
        await prisma.transaction.create({
            data: {
                amount,
                description,
                type,
                userId: 'test-user-id', // Temp 
                categoryId,
            },
        })

        revalidatePath('/')
    } catch (err) {
        console.error('Error creating transaction:', err)
    }
}

export async function deleteTransaction(transactionId: string) {
    try {
        await prisma.transaction.delete({
            where: { 
                id: transactionId 
            },
        })

        revalidatePath('/')
    } catch (err) {
        console.error('Error deleting transaction:', err)
    }
}