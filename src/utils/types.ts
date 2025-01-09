interface BaseAction {
  id: number,
  type: 'expense' | 'income'
  title: string,
  amount: number,
  date: Date
}

interface Expense extends BaseAction {
  type: 'expense',
  description: string,
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

interface Actions {
  total_incomes: number,
  total_expenses: number,
  actions: Action[]
}

interface Data {
  personal_info: {
    name: string,
    avatar: string
  },
  theme: 'light' | 'dark',
  actions: Actions,
  categories: Category[]
}

interface NavRouteType {
  name: string,
  path: string,
  icon: string
}

export type { Action, Category, NavRouteType, Data, Actions, CategoryColor}