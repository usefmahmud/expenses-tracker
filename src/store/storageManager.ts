import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { Category, Data, Expense, LocalStorageInterface } from "../utils/types"
import { defaultCategories } from '../utils/db'

const KEY = 'expense-tracker-data'
const default_data: Data = {
  personal_info: {
    name: 'Default User',
    avatar: 'avatar-1.svg'
  },
  expenses: {
    data: [],
    total: 0
  },
  incomes: {
    data: [],
    total: 0
  },
  categories: defaultCategories,
  theme: 'dark'
}

class LocalStorage implements LocalStorageInterface {
  getItem<T>(key: string): T {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) as T : default_data as T
  }

  setItem<T>(key: string, value: T){
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string){
    localStorage.removeItem(key)
  }
}

class ExpenseManager {
  private store: Writable<Data['expenses']>
  private storage: LocalStorageInterface

  constructor(storage: LocalStorageInterface, defaultExpenses: Data['expenses']){
    this.store = writable(defaultExpenses)
    this.storage = storage
  }
  
  addExpense(expense: Omit<Expense, 'id'| 'date'>, date: Date = new Date()): void{
    const id = Date.now()
    const data = this.storage.getItem<Data>(KEY) || default_data
    const newExpense = {...expense, id, date}

    data.expenses.data.push(newExpense)
    data.expenses.total += newExpense.amount

    this.store.update(expenses => ({
      data: [...expenses.data, newExpense],
      total: expenses.total + newExpense.amount
    }))
    this.storage.setItem(KEY, data)
  }

  removeExpense(id: number): void {
    const data = this.storage.getItem<Data>(KEY) || default_data
    
    const idx = data.expenses.data.findIndex(expense => expense.id === id)
    if(idx === -1) return

    data.expenses.total -= data.expenses.data[idx].amount
    data.expenses.data.splice(idx, 1)

    this.store.update(expenses => ({
      data: expenses.data.filter(expense => expense.id !== id),
      total: expenses.total
    }))
    this.storage.setItem(KEY, data)
  }

  get expenses(): Writable<Data['expenses']>{
    return this.store
  }

  get expensesByCategory(): Record<number, {expenses: Expense[], total: number}> {
    const data = this.storage.getItem<Data>(KEY) || default_data
    // return if data is empty
    if(data.expenses.data.length === 0) return {}
    
    return data.expenses.data.reduce((acc, expense) => {
      if(!acc[expense.category]){
        acc[expense.category] = {
          expenses: [],
          total: 0
        }
      }

      acc[expense.category].expenses.push(expense)
      acc[expense.category].total += expense.amount
      return acc
    }, {} as Record<number, {expenses: Expense[], total: number}>)
  }
}

class CategoryManager {
  private store: Writable<Category[]>
  private storage: LocalStorageInterface

  constructor(storage: LocalStorageInterface, defaultCategories: Category[]){
    this.store = writable(defaultCategories)
    this.storage = storage
  }

  addCategory(category: Omit<Category, 'id'>): void {
    const data = this.storage.getItem<Data>(KEY) || default_data
    const id = Date.now()
    const newCategory = {...category, id}

    data.categories.push(newCategory)
    this.store.update(categories => [...categories, newCategory])
    this.storage.setItem(KEY, data)
  }

  removeCategory(id: number): void {
    const data = this.storage.getItem<Data>(KEY) || default_data

    const idx = data.categories.findIndex(category => category.id === id)
    if(idx === -1) return

    data.categories.splice(idx, 1)
    this.store.update(categories => categories.filter(category => category.id !== id))
    this.storage.setItem(KEY, data)
  } 

  get categories(): Writable<Category[]> {
    return this.store
  }

  get getCategoryById(): (id: number) => Category | undefined {
    const data = this.storage.getItem<Data>(KEY) || default_data
    return (id: number) => data.categories.find(category => category.id === id)
  }
}

class ThemeManager {
  private store: Writable<'light' | 'dark'>
  private storage: LocalStorageInterface

  constructor(storage: LocalStorageInterface, defaultTheme: 'light' | 'dark'){
    this.store = writable(defaultTheme)
    this.storage = storage
  }

  setTheme(theme: 'light' | 'dark'): void {
    const data = this.storage.getItem<Data>(KEY) || default_data
    data.theme = theme

    this.store.set(theme)
    this.storage.setItem(KEY, data)
  }

  get theme(): Writable<'light' | 'dark'> {
    return this.store
  }
}

class Storage {
  private storage: LocalStorageInterface
  private data: Data

  expensesManager: ExpenseManager
  categoriesManager: CategoryManager
  themeManager: ThemeManager

  constructor(){
    this.storage = new LocalStorage()
    this.data = this.storage.getItem<Data>(KEY) || default_data

    this.expensesManager = new ExpenseManager(this.storage, this.data.expenses)
    this.categoriesManager = new CategoryManager(this.storage, this.data.categories)
    this.themeManager = new ThemeManager(this.storage, this.data.theme)
  }
}

export const storage = new Storage()