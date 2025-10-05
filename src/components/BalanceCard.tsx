type BalanceCardProps = {
    transactions: {
        amount: number
        type: string
    }[]
}

export function BalanceCard({ transactions }: BalanceCardProps) {
    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const balance = income - expense

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Total Income</p>
                <p className="text-2xl font-bold text-green-600">
                    +${income.toFixed(2)}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Total Expense</p>
                <p className="text-2xl font-bold text-red-600">
                    -${expense.toFixed(2)}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Balance</p>
                <p className={`text-2x; font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${balance.toFixed(2)}
                </p>
            </div>
        </div>
    )
}