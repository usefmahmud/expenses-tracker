import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Data } from "../utils/types";

const KEY = 'expense-tracker-data'
const default_data: Data = {
  personal_info: {
    name: 'Default User',
    avatar: 'avatar-1.svg'
  },
  actions: [],
  categories: [],
  theme: 'dark'
}

class Storage {
  store: Writable<Data>;

  constructor(){
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