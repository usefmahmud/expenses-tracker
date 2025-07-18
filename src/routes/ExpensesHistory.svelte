<script lang="ts">
  import Icon from "../components/Icon.svelte";
  import { storage } from "../store/storageManager";
  import type { Expense } from "../utils/types";

  const expensesManager = storage.expensesManager;
  const categoriesManager = storage.categoriesManager;
  const expensesStore = expensesManager.expenses;
  const categoriesStore = categoriesManager.categories;

  let expenses: Expense[] = [];
  let filteredExpenses: Expense[] = [];
  let selectedCategoryId: number | null = null;
  let sortBy: 'date' | 'amount' | 'title' = 'date';
  let sortOrder: 'asc' | 'desc' = 'desc';
  let searchTerm = '';

  $: expenses = $expensesStore.data;
  $: {
    filteredExpenses = expenses.filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategoryId === null || expense.category === selectedCategoryId;
      return matchesSearch && matchesCategory;
    });

    // Sort expenses
    filteredExpenses = [...filteredExpenses].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      weekday: 'short'
    });
  };

  const getCategoryById = (id: number) => {
    return $categoriesStore.find(cat => cat.id === id);
  };

  const handleDeleteExpense = (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      expensesManager.removeExpense(id);
    }
  };

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = newSortBy;
      sortOrder = 'desc';
    }
  };

  const clearFilters = () => {
    selectedCategoryId = null;
    searchTerm = '';
    sortBy = 'date';
    sortOrder = 'desc';
  };

  const getTotalFilteredAmount = () => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  };
</script>

<div class="expenses-history">
  <div class="history__header">
    <div class="header__title">
      <h1>Expenses History</h1>
      <p>View and manage all your expenses</p>
    </div>
    
    <div class="header__stats">
      <div class="stat">
        <span class="stat__label">Total Expenses</span>
        <span class="stat__value">${getTotalFilteredAmount().toFixed(2)}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Showing</span>
        <span class="stat__value">{filteredExpenses.length} of {expenses.length}</span>
      </div>
    </div>
  </div>

  <div class="history__filters">
    <div class="filters__search">
      <Icon icon="bx bx-search" size={20} />
      <input 
        type="text" 
        placeholder="Search expenses..."
        bind:value={searchTerm}
        class="search__input"
      />
    </div>

    <div class="filters__category">
      <select bind:value={selectedCategoryId} class="category__select">
        <option value={null}>All Categories</option>
        {#each $categoriesStore as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </div>

    <div class="filters__sort">
      <button 
        class="sort__btn"
        class:sort__btn--active={sortBy === 'date'}
        onclick={() => toggleSort('date')}
      >
        Date
        {#if sortBy === 'date'}
          <Icon icon={sortOrder === 'asc' ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt'} size={16} />
        {/if}
      </button>
      
      <button 
        class="sort__btn"
        class:sort__btn--active={sortBy === 'amount'}
        onclick={() => toggleSort('amount')}
      >
        Amount
        {#if sortBy === 'amount'}
          <Icon icon={sortOrder === 'asc' ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt'} size={16} />
        {/if}
      </button>
      
      <button 
        class="sort__btn"
        class:sort__btn--active={sortBy === 'title'}
        onclick={() => toggleSort('title')}
      >
        Title
        {#if sortBy === 'title'}
          <Icon icon={sortOrder === 'asc' ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt'} size={16} />
        {/if}
      </button>
    </div>

    <button class="filters__clear" onclick={clearFilters}>
      <Icon icon="bx bx-x" size={16} />
      Clear
    </button>
  </div>

  <div class="history__content">
    {#if filteredExpenses.length === 0}
      <div class="empty-state">
        <Icon icon="bx bx-receipt" size={64} color="var(--secondary-color)" />
        <h3>No expenses found</h3>
        <p>
          {#if expenses.length === 0}
            Start by adding your first expense
          {:else}
            Try adjusting your search or filters
          {/if}
        </p>
      </div>
    {:else}
      <div class="expenses__list">
        {#each filteredExpenses as expense (expense.id)}
          {@const category = getCategoryById(expense.category)}
          <div class="expense__item">
            <div class="expense__info">
              <div 
                class="expense__icon"
                style="background-color: {category?.color.iconBgColor};"
              >
                <Icon 
                  icon="bx bx-{category?.icon || 'receipt'}"
                  size={20}
                  color={category?.color.iconColor || '#ffffff'}
                />
              </div>
              <div class="expense__details">
                <div class="expense__title">{expense.title}</div>
                <div class="expense__category">{category?.name || 'Unknown'}</div>
                <div class="expense__date">{formatDate(expense.date)}</div>
              </div>
            </div>
            
            <div class="expense__actions">
              <div class="expense__amount">
                <span class="amount__symbol">$</span>
                <span class="amount__value">{expense.amount.toFixed(2)}</span>
              </div>
              <button 
                class="delete__btn"
                onclick={() => handleDeleteExpense(expense.id)}
                title="Delete expense"
              >
                <Icon icon="bx bx-trash" size={16} color="#ff4757" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .expenses-history {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;

    .history__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1.5px solid #383838;

      .header__title {
        h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        p {
          font-size: 14px;
          color: var(--secondary-color);
          opacity: 0.8;
        }
      }

      .header__stats {
        display: flex;
        gap: 30px;

        .stat {
          text-align: right;

          .stat__label {
            display: block;
            font-size: 12px;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
            opacity: 0.8;
          }

          .stat__value {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-color);
          }
        }
      }
    }

    .history__filters {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 25px;
      flex-wrap: wrap;

      .filters__search {
        position: relative;
        flex: 1;
        min-width: 250px;

        :global(.icon) {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--secondary-color);
          opacity: 0.7;
        }

        .search__input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1.5px solid #383838;
          border-radius: 10px;
          background-color: var(--active-bg-color);
          color: var(--text-color);
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
            background-color: var(--active-hover-color);
          }

          &::placeholder {
            color: var(--secondary-color);
            opacity: 0.7;
          }
        }
      }

      .filters__category {
        .category__select {
          padding: 12px 15px;
          border: 1.5px solid #383838;
          border-radius: 10px;
          background-color: var(--active-bg-color);
          color: var(--text-color);
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }

      .filters__sort {
        display: flex;
        gap: 8px;

        .sort__btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: 1.5px solid #383838;
          border-radius: 8px;
          background-color: var(--active-bg-color);
          color: var(--text-color);
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;

          &:hover {
            background-color: var(--active-hover-color);
            border-color: #4a4a4a;
          }

          &.sort__btn--active {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
          }

          &:active {
            scale: 0.98;
          }
        }
      }

      .filters__clear {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        border: 1.5px solid #ff4757;
        border-radius: 8px;
        background-color: rgba(255, 71, 87, 0.1);
        color: #ff4757;
        font-size: 13px;
        font-family: 'Inter', sans-serif;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;

        &:hover {
          background-color: rgba(255, 71, 87, 0.2);
        }

        &:active {
          scale: 0.98;
        }
      }
    }

    .history__content {
      flex: 1;
      overflow: hidden;

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: var(--secondary-color);

        h3 {
          margin: 20px 0 12px 0;
          font-size: 22px;
          font-weight: 600;
          color: var(--text-color);
          opacity: 0.8;
        }

        p {
          font-size: 15px;
          opacity: 0.7;
          font-weight: 300;
        }
      }

      .expenses__list {
        height: 100%;
        overflow-y: auto;
        padding-right: 5px;

        /* Custom scrollbar */
        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-track {
          background: var(--primary-bg-color);
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }

        .expense__item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background-color: var(--active-bg-color);
          border: 1.5px solid #383838;
          border-radius: 12px;
          margin-bottom: 12px;
          transition: all 0.2s ease;
          user-select: none;

          &:hover {
            background-color: var(--active-hover-color);
            border-color: #4a4a4a;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

            .delete__btn {
              opacity: 0.7;
            }
          }

          &:active {
            transform: translateY(0);
            scale: 0.995;
          }

          .expense__info {
            display: flex;
            align-items: center;
            gap: 18px;

            .expense__icon {
              padding: 12px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 44px;
              min-height: 44px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .expense__details {
              .expense__title {
                font-size: 16px;
                font-weight: 500;
                color: var(--text-color);
                margin-bottom: 4px;
                letter-spacing: 0.3px;
              }

              .expense__category {
                font-size: 13px;
                color: var(--secondary-color);
                margin-bottom: 2px;
                opacity: 0.8;
              }

              .expense__date {
                font-size: 12px;
                color: var(--secondary-color);
                opacity: 0.6;
              }
            }
          }

          .expense__actions {
            display: flex;
            align-items: center;
            gap: 18px;

            .expense__amount {
              color: #762353;
              font-weight: 600;
              font-size: 17px;
              letter-spacing: 0.5px;
              text-align: right;

              .amount__symbol {
                margin-right: 3px;
                font-weight: 500;
              }
            }

            .delete__btn {
              background: none;
              border: none;
              cursor: pointer;
              padding: 8px;
              border-radius: 6px;
              transition: all 0.2s ease;
              opacity: 0;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover {
                background-color: rgba(255, 71, 87, 0.15);
                opacity: 1;
                transform: scale(1.05);
              }

              &:active {
                scale: 0.95;
                background-color: rgba(255, 71, 87, 0.25);
              }
            }
          }
        }
      }
    }
  }
</style>
