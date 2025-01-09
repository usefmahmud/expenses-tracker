<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import IncomesTab from "../lib/IncomesTab.svelte"
  import ExpensesTab from "../lib/ExpensesTab.svelte"
  let activeTab: 'expenses' | 'incomes' = 'expenses'

  const setTab = (tab: 'expenses' | 'incomes') => {
    activeTab = tab
  }

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
              color='#f11f99'
            />
          </div>
          <div class="card__title">
            Expenses
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
              color='#00dac6'
            />
          </div>
          <div class="card__title">
            Incomes
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
      .content__actions{
        display: flex;
        justify-content: space-between;
        justify-self: center;
        padding: 10px;

        background-color: var(--primary-bg-color);

        border-radius: 15px;
        max-width: 700px;
        width: 100%;

        .actions__card{
          flex: 1;
          background-color: transparent;
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
            background-color: rgba($color: #fff, $alpha: .07);

            &:hover{
              background-color: rgba($color: #fff, $alpha: .1);
            }
          }

          .card__content{
            border-radius: 10px;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 25px 15px;

            transition: background-color .2s, scale .2s;

            &:hover{
              background-color: rgba($color: #fff, $alpha: .025);
            }

            &:active{
              background-color: rgba($color: #fff, $alpha: .12);
              scale: .99;
            }

            .card__title{
              color: var(--text-color);
              font-weight: bold;
              font-size: 16px;

              display: flex;
              justify-content: center;
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
          }
        }
      }
    }
  }
</style>