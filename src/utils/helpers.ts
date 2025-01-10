import type { Category, Expense } from "./types"

export const getGreeting: () => string = () => {
  const hour = new Date().getHours()

  if(5 <= hour && hour < 12){
    return 'Good Morning'
  }else if(12 <= hour && hour < 17){
    return 'Good Afternoon'
  }else if(17 <= hour && hour < 21){
    return 'Good Evening'
  }else{
    return 'Good Night'
  }
}

export const expensesByCategory = (expenses: Expense[], categories: Category[], groupby: Category['id'] | null = null) => {
  return categories.map(category => {
    return {
      ...category,
      expenses: expenses.filter(expense => expense.category === category.id)
    }
  })
}