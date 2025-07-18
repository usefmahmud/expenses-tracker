<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import Modal from "../components/Modal.svelte";
  import { storage } from "../store/storageManager";
  import type { Income } from "../utils/types";
  import AddIncome from "./AddIncome.svelte";

  const incomesManager = storage.incomesManager
  const incomeStore = incomesManager.incomes

  let incomes: Income[] = []
  $: incomes = $incomeStore.data

  let isAddIncomeOpen: boolean = false
  const handleCloseIncomeModal = () => {
    isAddIncomeOpen = false
  }
  const handleOpenIncomeModal = () => {
    isAddIncomeOpen = true
  }

  const handleDeleteIncome = (id: number) => {
    incomesManager.removeIncome(id)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
</script>

<div class="incomes-tab">
  <div class="incomes__grid">
    {#each incomes as income (income.id)}
      <div class="income__card">
        <div class="income__content">
          <div class="income__icon">
            <Icon 
              icon='bx bx-dollar'
              size={23}
              color='#06b0a1'
            />
          </div>
          <div class="income__details">
            <div class="income__title">
              {income.title}
            </div>
            <div class="income__amount">
              <span>$</span>
              {income.amount.toFixed(2)}
            </div>
            <div class="income__date">
              {formatDate(income.date)}
            </div>
          </div>
          <button 
            class="delete__btn"
            onclick={() => handleDeleteIncome(income.id)}
            title="Delete income"
          >
            <Icon 
              icon='bx bx-trash'
              size={16}
              color='#ff4757'
            />
          </button>
        </div>
      </div>
    {/each}

    <!-- Add Income Card -->
    <div class="income__card">
      <div 
        class="income__content add-income__content"
        role="button"
        tabindex="0"
        onclick={handleOpenIncomeModal}
        onkeydown={(e) => { 
          if(e.key === 'Enter' || e.key === ' '){
            handleOpenIncomeModal()
          }
        }}
      >
        <div class="income__icon">
          <Icon 
            icon='bx bx-plus'
            size={23}
          />
        </div>
        <div class="income__details">
          <div class="income__title">
            Add Income
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if isAddIncomeOpen}
  <Modal 
    title='ADD INCOME'
    handleCloseModal={handleCloseIncomeModal}
  >
    <AddIncome 
      {handleCloseIncomeModal}
    />
  </Modal>
{/if}

<style lang="scss">
  .incomes-tab{
    height: 100%;
    max-width: 1000px;
    width: 100%;

    .incomes__grid{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(5, 70px);
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      .income__card{
        position: relative;

        .income__content{
          height: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 10px;
          position: relative;

          border: 1.5px solid #383838;
          cursor: pointer;
          user-select: none;

          transition: background-color .2s, scale .15s;

          &.add-income__content {
            border-style: dashed;

            .income__details {
              .income__title {
                font-size: 18px;
              }
            }

            &:hover {
              background-color: rgba(255, 255, 255, 0.04);
            }
          }

          .income__icon{
            background-color: #124241;
            height: 100%;
            width: auto;
            aspect-ratio: 1 / 1;
            border-radius: 5px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin-right: 10px;

            box-shadow: 0 2px 8px rgba(18, 66, 65, 0.3);
          }

          .income__details{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;

            .income__title{
              font-size: 14px;
              font-weight: 400;
              color: var(--text-color);
              margin-bottom: 2px;
            }

            .income__amount{
              font-size: 17px;
              font-weight: 500;
              color: #195d5b;

              span{
                margin-right: 2px;
              }
            }

            .income__date{
              font-size: 11px;
              color: var(--secondary-color);
              opacity: 0.8;
            }
          }

          .delete__btn{
            position: absolute;
            top: 5px;
            right: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
            opacity: 0;
            z-index: 10;

            &:hover{
              background-color: rgba(255, 71, 87, 0.15);
              opacity: 1;
              transform: scale(1.1);
            }

            &:active{
              scale: 0.95;
            }
          }

          &:hover {
            .delete__btn {
              opacity: 0.7;
            }
          }

          &:active{
            scale: .99;
          }
        }

        &:not(.empty-card):not(:has(.add-income__content)) {
          .income__content:hover {
            background-color: rgba(18, 66, 65, 0.1);
          }
        }
      }
    }
  }
</style>