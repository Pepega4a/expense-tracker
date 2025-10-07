# 💰 Expense Tracker

A modern, full-stack expense tracking application built with Next.js, Prisma, and TypeScript.

## ✨ Features

- 📊 **Transaction Management** - Add, edit, and delete income/expense transactions
- 🏷️ **Category Filtering** - Organize transactions by custom categories
- 💱 **Multi-Currency Support** - Track expenses in multiple currencies with automatic conversion
- 🌐 **Live Exchange Rates** - Real-time currency conversion using live API data
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 📈 **Balance Overview** - Real-time tracking of income, expenses, and total balance
- 🔍 **Advanced Filtering** - Filter by transaction type and category
- 📄 **Pagination** - Easy navigation through transaction history

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Next.js API Routes
- Prisma ORM
- SQLite (development) / PostgreSQL (production)

**APIs:**
- Exchange Rate API for live currency conversion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pepega4a/expense-tracker.git
cd expense-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run prisma:seed  # Seed database with sample data
```

## 🎨 Features in Detail

### Transaction Management
- Create transactions with amount, category, date, and description
- Edit existing transactions with a modal interface
- Delete transactions with confirmation
- Automatic date selection (defaults to today)

### Currency Conversion
- Support for USD, EUR, GBP, RUB, JPY, and CNY
- Automatic conversion to selected display currency
- Shows original currency for converted transactions
- 24-hour caching of exchange rates

### Dark Mode
- System-wide dark theme support
- Persistent theme preference
- Smooth transitions between themes

## 🗂️ Project Structure

```
expense-tracker/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── app/
│   │   ├── actions.ts      # Server actions
│   │   ├── page.tsx        # Main page
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── BalanceCard.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionsList.tsx
│   │   ├── EditTransactionModal.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── CurrencyProvider.tsx
│   └── lib/
│       ├── prisma.ts       # Prisma client
│       ├── currency.ts     # Currency utilities
│       └── exchangeRates.ts # Exchange rate API
└── README.md
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add Vercel Postgres database
4. Deploy automatically

### Environment Variables

```env
DATABASE_URL="your_database_url"
```

## 📝 Future Enhancements

- [ ] Charts and analytics
- [ ] Budget tracking
- [ ] Recurring transactions
- [ ] Export to CSV/PDF
- [ ] Multi-user authentication
- [ ] Mobile app

## 👤 Author

**Vsevolod**
- GitHub: [@Pepega4a](https://github.com/Pepega4a)
- LinkedIn: [Seva Titov](https://linkedin.com/in/seva-titov-3a38532ba/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

⭐️ If you like this project, please give it a star on GitHub!