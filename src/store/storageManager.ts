import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type {
  Category,
  Data,
  Expense,
  Income,
  LocalStorageInterface,
} from "../utils/types";
import { defaultCategories } from "../utils/db";

const KEY = "expense-tracker-data";
const default_data: Data = {
  personal_info: {
    name: "Default User",
    avatar: "avatar-1.svg",
  },
  expenses: {
    data: [],
    total: 0,
  },
  incomes: {
    data: [],
    total: 0,
  },
  categories: defaultCategories,
  theme: "dark",
};

class LocalStorage implements LocalStorageInterface {
  getItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : (default_data as T);
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

class ExpenseManager {
  private store: Writable<Data["expenses"]>;
  private storage: LocalStorageInterface;

  constructor(
    storage: LocalStorageInterface,
    defaultExpenses: Data["expenses"]
  ) {
    this.store = writable(defaultExpenses);
    this.storage = storage;
  }

  addExpense(
    expense: Omit<Expense, "id" | "date">,
    date: Date = new Date()
  ): void {
    const id = Date.now();
    const data = this.storage.getItem<Data>(KEY) || default_data;
    const newExpense = { ...expense, id, date };

    this.store.update((expenses) => ({
      data: [...expenses.data, newExpense],
      total: expenses.total + newExpense.amount,
    }));

    data.expenses.data.push(newExpense);
    data.expenses.total += newExpense.amount;
    this.storage.setItem(KEY, data);
  }

  removeExpense(id: number): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;

    const idx = data.expenses.data.findIndex((expense) => expense.id === id);
    if (idx === -1) return;

    data.expenses.total -= data.expenses.data[idx].amount;
    data.expenses.data.splice(idx, 1);

    this.store.update((expenses) => ({
      data: expenses.data.filter((expense) => expense.id !== id),
      total: expenses.total,
    }));
    this.storage.setItem(KEY, data);
  }

  get expenses(): Writable<Data["expenses"]> {
    return this.store;
  }

  get expensesByCategory(): Record<
    number,
    { expenses: Expense[]; total: number }
  > {
    const data = this.storage.getItem<Data>(KEY) || default_data;
    // return if data is empty
    if (data.expenses.data.length === 0) return {};

    return data.expenses.data.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          expenses: [],
          total: 0,
        };
      }

      acc[expense.category].expenses.push(expense);
      acc[expense.category].total += expense.amount;
      return acc;
    }, {} as Record<number, { expenses: Expense[]; total: number }>);
  }
}

class IncomeManager {
  private store: Writable<Data["incomes"]>;
  private storage: LocalStorageInterface;

  constructor(storage: LocalStorageInterface, defaultIncomes: Data["incomes"]) {
    this.store = writable(defaultIncomes);
    this.storage = storage;
  }

  addIncome(
    income: Omit<Income, "id" | "date">,
    date: Date = new Date()
  ): void {
    const id = Date.now();
    const data = this.storage.getItem<Data>(KEY) || default_data;
    const newIncome = { ...income, id, date };

    this.store.update((incomes) => ({
      data: [...incomes.data, newIncome],
      total: incomes.total + newIncome.amount,
    }));

    data.incomes.data.push(newIncome);
    data.incomes.total += newIncome.amount;
    this.storage.setItem(KEY, data);
  }

  removeIncome(id: number): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;

    const idx = data.incomes.data.findIndex((income) => income.id === id);
    if (idx === -1) return;

    data.incomes.total -= data.incomes.data[idx].amount;
    data.incomes.data.splice(idx, 1);

    this.store.update((incomes) => ({
      data: incomes.data.filter((income) => income.id !== id),
      total: incomes.total,
    }));
    this.storage.setItem(KEY, data);
  }

  get incomes(): Writable<Data["incomes"]> {
    return this.store;
  }
}

class CategoryManager {
  private store: Writable<Category[]>;
  private storage: LocalStorageInterface;

  constructor(storage: LocalStorageInterface, defaultCategories: Category[]) {
    this.store = writable(defaultCategories);
    this.storage = storage;
  }

  addCategory(category: Omit<Category, "id">): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;
    const id = Date.now();
    const newCategory = { ...category, id };

    this.store.update((categories) => [...categories, newCategory]);

    data.categories.push(newCategory);
    this.storage.setItem(KEY, data);
  }

  removeCategory(id: number): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;

    const idx = data.categories.findIndex((category) => category.id === id);
    if (idx === -1) return;

    data.categories.splice(idx, 1);
    this.store.update((categories) =>
      categories.filter((category) => category.id !== id)
    );
    this.storage.setItem(KEY, data);
  }

  get categories(): Writable<Category[]> {
    return this.store;
  }

  get getCategoryById(): (id: number) => Category | undefined {
    const data = this.storage.getItem<Data>(KEY) || default_data;
    return (id: number) =>
      data.categories.find((category) => category.id === id);
  }
}

class ThemeManager {
  private store: Writable<"light" | "dark">;
  private storage: LocalStorageInterface;

  constructor(storage: LocalStorageInterface, defaultTheme: "light" | "dark") {
    this.store = writable(defaultTheme);
    this.storage = storage;
  }

  setTheme(theme: "light" | "dark"): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;
    data.theme = theme;

    this.store.set(theme);
    this.storage.setItem(KEY, data);
  }

  get theme(): Writable<"light" | "dark"> {
    return this.store;
  }
}

class PersonalInfoManager {
  private storage: LocalStorageInterface;

  constructor(storage: LocalStorageInterface) {
    this.storage = storage;
  }

  updatePersonalInfo(name?: string, avatar?: string): void {
    const data = this.storage.getItem<Data>(KEY) || default_data;

    if (name !== undefined) {
      data.personal_info.name = name;
    }

    if (avatar !== undefined) {
      data.personal_info.avatar = avatar;
    }

    this.storage.setItem(KEY, data);
  }

  getPersonalInfo(): Data["personal_info"] {
    const data = this.storage.getItem<Data>(KEY) || default_data;
    return data.personal_info;
  }
}

class Storage {
  private storage: LocalStorageInterface;
  private data: Data;

  expensesManager: ExpenseManager;
  incomesManager: IncomeManager;
  categoriesManager: CategoryManager;
  themeManager: ThemeManager;
  personalInfoManager: PersonalInfoManager;

  constructor() {
    this.storage = new LocalStorage();
    this.data = this.storage.getItem<Data>(KEY) || default_data;

    // // clear previous version of data schema
    // // untill fix versioning issue
    // this.storage.removeItem(KEY)

    this.expensesManager = new ExpenseManager(this.storage, this.data.expenses);
    this.incomesManager = new IncomeManager(this.storage, this.data.incomes);
    this.categoriesManager = new CategoryManager(
      this.storage,
      this.data.categories
    );
    this.themeManager = new ThemeManager(this.storage, this.data.theme);
    this.personalInfoManager = new PersonalInfoManager(this.storage);
  }
}

export const storage = new Storage();
