import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Data } from "../utils/types";
import { defaultCategorys } from '../utils/db'

const KEY = 'expense-tracker-data'
const default_data: Data = {
  personal_info: {
    name: 'Default User',
    avatar: 'avatar-1.svg'
  },
  actions: {
    total_expenses: 0,
    total_incomes: 0,
    actions: [
      {
        id: 1,
        type: 'expense',
        amount: 120,
        description: '234243',
        category: 1,
        date: new Date(),
        title: 'Hello'
      },{
        id: 2,
        type: 'expense',
        amount: 100,
        description: '234243',
        category: 1,
        date: new Date(),
        title: 'Hello'
      },{
        id: 2,
        type: 'expense',
        amount: 250,
        description: '234243',
        category: 2,
        date: new Date(),
        title: 'Hello'
      }
    ]
  },
  categories: defaultCategorys,
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
}

export const storage = new Storage()