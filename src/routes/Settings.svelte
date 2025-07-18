<script lang="ts">
  import Icon from "../components/Icon.svelte";
  import { storage } from "../store/storageManager";
  import { toast } from 'svelte-french-toast';

  const { personalInfoManager, themeManager, expensesManager, incomesManager, categoriesManager } = storage;
  const themeStore = themeManager.theme;
  const expensesStore = expensesManager.expenses;
  const incomesStore = incomesManager.incomes;
  const categoriesStore = categoriesManager.categories;

  let personalInfo = personalInfoManager.getPersonalInfo();
  let newName = personalInfo.name;
  let selectedAvatar = personalInfo.avatar;

  // Available avatars
  const avatars = [
    'avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg',
    'avatar-5.svg', 'avatar-6.svg', 'avatar-7.svg', 'avatar-8.svg',
    'avatar-9.svg', 'avatar-10.svg', 'avatar-11.svg', 'avatar-12.svg'
  ];

  const handleSavePersonalInfo = () => {
    if (newName.trim() === '') {
      toast.error('Name cannot be empty');
      return;
    }
    
    personalInfoManager.updatePersonalInfo(newName.trim(), selectedAvatar);
    personalInfo = personalInfoManager.getPersonalInfo();
    toast.success('Personal information updated successfully');
  };

  const handleThemeToggle = () => {
    const newTheme = $themeStore === 'dark' ? 'light' : 'dark';
    themeManager.setTheme(newTheme);
    toast.success(`Switched to ${newTheme} theme`);
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('expense-tracker-data');
      toast.success('All data cleared successfully');
      // Reload the page to reset the state
      window.location.reload();
    }
  };

  const getStatsData = () => {
    return {
      totalExpenses: $expensesStore.total,
      totalIncomes: $incomesStore.total,
      expenseCount: $expensesStore.data.length,
      incomeCount: $incomesStore.data.length,
      categoryCount: $categoriesStore.length,
      balance: $incomesStore.total - $expensesStore.total
    };
  };

  $: stats = getStatsData();
</script>

<div class="settings">
  <div class="settings__content">
    
    <!-- Personal Information Section -->
    <div class="settings__section">
      <h2 class="section__title">
        <Icon icon="bx bx-user" size={24} />
        Personal Information
      </h2>
      
      <div class="personal-info">
        <div class="avatar-selection">
          <h3>Profile Avatar</h3>
          <div class="avatar-grid">
            {#each avatars as avatar}
              <button 
                class="avatar-option"
                class:avatar-option--selected={avatar === selectedAvatar}
                onclick={() => selectedAvatar = avatar}
              >
                <img src="/src/assets/avatars/{avatar}" alt="Avatar option" />
              </button>
            {/each}
          </div>
        </div>
        
        <div class="name-field">
          <label for="name">Display Name</label>
          <input 
            id="name"
            type="text" 
            bind:value={newName}
            placeholder="Enter your name"
            class="name-input"
          />
        </div>
        
        <button class="save-btn" onclick={handleSavePersonalInfo}>
          <Icon icon="bx bx-save" size={16} />
          Save Changes
        </button>
      </div>
    </div>

    <!-- Theme Section -->
    <div class="settings__section">
      <h2 class="section__title">
        <Icon icon="bx bx-palette" size={24} />
        Appearance
      </h2>
      
      <div class="theme-controls">
        <div class="theme-option">
          <div class="theme-info">
            <h3>Theme</h3>
            <p>Choose between light and dark theme</p>
          </div>
          <button 
            class="theme-toggle"
            onclick={handleThemeToggle}
          >
            <Icon 
              icon={$themeStore === 'dark' ? 'bx bx-moon' : 'bx bx-sun'} 
              size={20} 
            />
            <span>{$themeStore === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="settings__section">
      <h2 class="section__title">
        <Icon icon="bx bx-bar-chart" size={24} />
        Statistics
      </h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <Icon icon="bx bx-credit-card" size={24} color="#bd1778" />
          <div class="stat-info">
            <div class="stat-label">Total Expenses</div>
            <div class="stat-value expense">${stats.totalExpenses.toFixed(2)}</div>
            <div class="stat-count">{stats.expenseCount} transactions</div>
          </div>
        </div>
        
        <div class="stat-card">
          <Icon icon="bx bx-dollar" size={24} color="#06b0a1" />
          <div class="stat-info">
            <div class="stat-label">Total Incomes</div>
            <div class="stat-value income">${stats.totalIncomes.toFixed(2)}</div>
            <div class="stat-count">{stats.incomeCount} transactions</div>
          </div>
        </div>
        
        <div class="stat-card">
          <Icon icon="bx bx-wallet" size={24} color={stats.balance >= 0 ? "#06b0a1" : "#bd1778"} />
          <div class="stat-info">
            <div class="stat-label">Balance</div>
            <div class="stat-value {stats.balance >= 0 ? 'income' : 'expense'}">
              ${Math.abs(stats.balance).toFixed(2)}
            </div>
            <div class="stat-count">{stats.balance >= 0 ? 'Surplus' : 'Deficit'}</div>
          </div>
        </div>
        
        <div class="stat-card">
          <Icon icon="bx bx-category" size={24} color="#7c3aed" />
          <div class="stat-info">
            <div class="stat-label">Categories</div>
            <div class="stat-value">{stats.categoryCount}</div>
            <div class="stat-count">expense categories</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Management Section -->
    <div class="settings__section">
      <h2 class="section__title">
        <Icon icon="bx bx-data" size={24} />
        Data Management
      </h2>
      
      <div class="data-controls">
        <div class="data-option danger">
          <div class="data-info">
            <h3>Clear All Data</h3>
            <p>This will permanently delete all your expenses, incomes, and categories</p>
          </div>
          <button 
            class="danger-btn"
            onclick={handleClearAllData}
          >
            <Icon icon="bx bx-trash" size={16} />
            Clear Data
          </button>
        </div>
      </div>
    </div>

  </div>
</div>

<style lang="scss">
  .settings {
    height: 100%;
    width: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 20px;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }    

    &::-webkit-scrollbar {
      background-color: #333333;
      border-radius: 20px;
    }

    .settings__content {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;

      .settings__section {
        background-color: var(--active-bg-color);
        border: 1px solid #383838;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;

        .section__title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 24px;
        }

        // Personal Information Styles
        .personal-info {
          .avatar-selection {
            margin-bottom: 24px;

            h3 {
              font-size: 16px;
              font-weight: 500;
              color: var(--text-color);
              margin-bottom: 16px;
            }

            .avatar-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
              gap: 12px;
              max-width: 480px;

              .avatar-option {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 2px solid transparent;
                background: none;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.2s;

                &.avatar-option--selected {
                  border-color: var(--primary-color);
                  transform: scale(1.1);
                }

                &:hover {
                  transform: scale(1.05);
                }

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
          }

          .name-field {
            margin-bottom: 24px;

            label {
              display: block;
              font-size: 14px;
              font-weight: 500;
              color: var(--text-color);
              margin-bottom: 8px;
            }

            .name-input {
              width: 100%;
              max-width: 300px;
              padding: 12px 16px;
              border: 1px solid #383838;
              border-radius: 8px;
              background-color: var(--secondary-bg-color);
              color: var(--text-color);
              font-size: 16px;
              font-family: 'Inter';

              &:focus {
                outline: none;
                border-color: var(--primary-color);
              }
            }
          }

          .save-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              opacity: 0.9;
            }

            &:active {
              scale: 0.98;
            }
          }
        }

        // Theme Styles
        .theme-controls {
          .theme-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border: 1px solid #383838;
            border-radius: 8px;

            .theme-info {
              h3 {
                font-size: 16px;
                font-weight: 500;
                color: var(--text-color);
                margin-bottom: 4px;
              }

              p {
                font-size: 14px;
                color: var(--secondary-color);
              }
            }

            .theme-toggle {
              display: flex;
              align-items: center;
              gap: 8px;
              background-color: var(--active-bg-color);
              border: 1px solid #383838;
              color: var(--text-color);
              padding: 8px 16px;
              border-radius: 6px;
              cursor: pointer;
              transition: all 0.2s;

              &:hover {
                background-color: var(--active-hover-color);
              }
            }
          }
        }

        // Statistics Styles
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;

          .stat-card {
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 24px;
            border: 1.5px solid #383838;
            border-radius: 12px;
            transition: all 0.2s ease;
            cursor: pointer;
            user-select: none;
            font-family: 'Inter', sans-serif;

            &:hover {
              border-color: #4a4a4a;
              background-color: var(--active-hover-color);
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            }

            &:active {
              scale: 0.98;
              transform: translateY(0);
            }

            .stat-info {
              flex: 1;

              .stat-label {
                font-size: 16px;
                color: var(--text-color);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
                font-weight: 600;
                opacity: 0.8;
              }

              .stat-value {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 6px;
                letter-spacing: 0.5px;
                color: var(--text-color);

                &.expense {
                  color: #762353;
                }

                &.income {
                  color: #195d5b;
                }
              }

              .stat-count {
                font-size: 13px;
                color: var(--secondary-color);
                font-weight: 400;
                opacity: 0.7;
              }
            }

            // Icon styling within stat cards
            :global(.icon) {
              background-color: var(--secondary-bg-color);
              padding: 12px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 48px;
              min-height: 48px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
          }
        }

        // Data Management Styles
        .data-controls {
          .data-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border: 1px solid #383838;
            border-radius: 8px;

            &.danger {
              border-color: #ff4757;
              background-color: rgba(255, 71, 87, 0.05);
            }

            .data-info {
              h3 {
                font-size: 16px;
                font-weight: 500;
                color: var(--text-color);
                margin-bottom: 4px;
              }

              p {
                font-size: 14px;
                color: var(--secondary-color);
              }
            }

            .danger-btn {
              display: flex;
              align-items: center;
              gap: 8px;
              background-color: #ff4757;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;

              &:hover {
                background-color: #ff3838;
              }

              &:active {
                scale: 0.98;
              }
            }
          }
        }
      }
    }
  }
</style>