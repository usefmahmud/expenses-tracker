interface Expense {
  id: number,
  title: string,
  description: string,
  amount: number,
  date: Date,
  category: number
}

interface Category {
  id: number,
  name: string,
  color: string,
  icon: string,
}

interface NavRouteType {
  name: string,
  path: string,
  icon: string
}

export type { Expense, Category, NavRouteType }