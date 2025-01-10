import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Category, Data } from "../utils/types";
import { defaultCategories } from '../utils/db'

const KEY = 'expense-tracker-data'
const default_data: Data = {
  personal_info: {
    name: 'Default User',
    avatar: 'avatar-1.svg'
  },
  actions: {
    total_expenses: 0,
    total_incomes: 0,
    actions: []
  },
  categories: defaultCategories,
  theme: 'dark'
}

class Storage {
  store: Writable<Data>;

  constructor(){
    // CLEAR STORAGE EACH TIME
    // AFTER DEV STAGE WILL SET A FUNCTION TO AUTO GET OLD DATA
    localStorage.clear()

    localStorage.setItem(KEY, JSON.stringify(this.getData()))
    this.store = writable(this.getData())
  }

  getData(): Data {
    const d = localStorage.getItem(KEY)
    return d ? JSON.parse(d) : default_data
  }

  getTheme(): Data['theme'] {
    return this.getData().theme
  }

  toggleTheme = () => {
    const data = this.getData()
    data.theme = data.theme === 'dark' ? 'light' : 'dark'
    
    localStorage.setItem(KEY, JSON.stringify(data))

    this.store.set(data)
  }

  // Category
  addCategory = (category: Omit<Category, 'id'>) => {
    const id = Date.now()
    const newData = this.getData()
    
    newData.categories.push({...category, id})
    
    localStorage.setItem(KEY, JSON.stringify(newData))
    this.store.set(newData)
  }
}

export const storage = new Storage()