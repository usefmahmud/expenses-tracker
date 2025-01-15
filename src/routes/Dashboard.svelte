<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import IncomesTab from "../lib/IncomesTab.svelte"
  import ExpensesTab from "../lib/ExpensesTab.svelte"
  import { storage } from "../store/storageManager";

  let activeTab: 'expenses' | 'incomes' = 'expenses'
  const setTab = (tab: 'expenses' | 'incomes') => {
    activeTab = tab
  }

  const expensesStore = storage.expensesManager.expenses
  // const incomesStore = storage.incomesManager.incomes

  let expenses = $expensesStore
  $: expenses = $expensesStore

</script>

<div class="dashboard">
  <div class="dashboard__content">

    <div class="content__actions">

      <button 
        class="actions__card {activeTab === 'expenses' && 'actions__card--active'}"
        onclick={() => setTab('expenses')}
      >
        <div class="card__content">
          <div 
            class="card__icon"
            style="background-color: #6f2751;"
          >
            <Icon 
              icon='bx bx-credit-card'
              size={18}
              color='#bd1778'
            />
          </div>
          <div class="card__details">
            <div class="card__title">
              Expenses
            </div>
            <div class="card__value" style="color: #762353;">
              <span>$</span>
              <span>
                {
                  expenses.total === 0 ?
                  '0.00'
                  : expenses.total.toFixed(2)
                }
              </span>
            </div>
          </div>
        </div>
      </button>

      <button
        class="actions__card {activeTab === 'incomes' ? 'actions__card--active' : ''}"
        onclick={() => setTab('incomes')}    
      >
        <div class="card__content">
          <div 
            class="card__icon"
            style="background-color: #124241;"
          >
            <Icon 
              icon='bx bx-dollar'
              size={18}
              color='#06b0a1'
            />
          </div>
          <div class="card__details">
            <div class="card__title">
              Incomes
            </div>
            <div class="card__value" style="color: #195d5b;">
              <span>$</span>
              <span>
                0.00
              </span>
            </div>
          </div>
        </div>
      </button>

    </div>

    <div class="content__tab">
      {#if activeTab === 'expenses'}
        <ExpensesTab />
      {:else}
        <IncomesTab />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .dashboard{
    width: 100%;
    height: 100%;

    .dashboard__content{
      height: 100%;
      .content__actions{
        display: flex;
        justify-content: space-between;
        justify-self: center;
        padding: 10px;
        margin-bottom: 30px;

        background-color: var(--primary-bg-color);

        border-radius: 15px;
        max-width: 700px;
        width: 100%;

        .actions__card{
          flex: 1;
          background: none;
          border: none;
          
          user-select: none;
          cursor: pointer;

          // max-width: 300px;

          &:first-child{
            margin-right: 5px;
          }

          &:last-child{
            margin-left: 5px;
          }

          &.actions__card--active .card__content{
            // background-color: rgba($color: #fff, $alpha: .07);
            background-color: var(--active-bg-color);

            &:hover{
              background-color: var(--active-hover-color);
            }

            &:active{
              background-color: var(--active-click-color);
              scale: .99;
            }
          }

          .card__content{
            border-radius: 10px;

            display: flex;
            align-items: center;

            padding: 25px 30px;

            transition: background-color .2s, scale .2s;

            &:hover{
              background-color: var(--hover-color);
            }

            &:active{
              background-color: var(--active-click-color);
              scale: .99;
            }


            .card__icon{
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 20px;

              background-color: rgb(34, 34, 85);
              box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px;
              color: #00dac6;
              border-radius: 50%;

              min-height: 50px;
              min-width: 50px;
            }

            .card__details{
              color: var(--text-color);

              .card__title{
                font-weight: bold;
                font-size: 18px;
                transform: translateY(-10px);
                display: none;
              }

              .card__value{
                font-size: 32px;
                font-weight: 700;
              }
            }
          }
        }
      }

      .content__tab{
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>