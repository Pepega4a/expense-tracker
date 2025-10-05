'use server'

import {prisma} from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function createTransaction(formData: FormData) {
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const type = formData.get('type') as string

    //TODO: add category

    try {
        await prisma.transaction.create({
            data: {
                amount,
                description,
                type,
                userId: 'test-user-id', // Temp 
                categoryId: "test-category-id" // Temp
            },
        })

        revalidatePath('/')
    } catch (err) {
        console.error('Error creating transaction:', err)
    }
}