interface BaseAction {
  id: number,
  type: 'expense' | 'income'
  title: string,
  amount: number,
  date: Date
}

interface Expense extends BaseAction {
  type: 'expense',
  category: number
}

interface Income extends BaseAction {
  type: 'income'
}

type Action = Expense | Income;

interface CategoryColor {
  colorName: string
  iconColor: string,
  iconBgColor: string,
  textColor: string,
  hoverBgColor: string
}

interface Category {
  id: number,
  name: string,
  color: CategoryColor,
  icon: string,
}

interface Data {
  personal_info: {
    name: string,
    avatar: string
  },
  theme: 'light' | 'dark',
  expenses: {
    data: Expense[],
    total: number
  },
  incomes: {
    data: Income[],
    total: number
  },
  categories: Category[]
}

interface NavRouteType {
  name: string,
  path: string,
  icon: string
}

interface LocalStorageInterface {
  getItem<T>(key: string): T | null
  setItem<T>(key: string, value: T): void
  removeItem(key: string): void
}

export type { Expense, Income, Action, Category, NavRouteType, Data, CategoryColor, LocalStorageInterface }