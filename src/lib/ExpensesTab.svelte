<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import Modal from "../components/Modal.svelte";
  import { storage } from "../store/storageManager";
  import type { Category } from "../utils/types";
  import AddCategory from "./AddCategory.svelte";
  import AddExpense from "./AddExpense.svelte";

  const expensesManager = storage.expensesManager
  
  const cateogryStore = storage.categoriesManager.categories
  const expenseStore = expensesManager.expenses

  let groupedExpenses = expensesManager.expensesByCategory
  $: $expenseStore, groupedExpenses = expensesManager.expensesByCategory
  $: console.log(groupedExpenses)

  let isAddCategoryOpen: boolean = false
  const handleCloseCategoryModal = () => {
    isAddCategoryOpen = false
  }
  const handleOpenCategoryModal = () => {
    isAddCategoryOpen = true
  }

  let isAddExpenseOpen: boolean = false
  let selectedCategoryId: Category['id']
  const handleCloseExpenseModal = () => {
    isAddExpenseOpen = false
  }
  const handleOpenExpenseModal = (categoryId: Category['id']) => {
    isAddExpenseOpen = true
    selectedCategoryId = categoryId
  }
</script>

<div class="expenses-tab">
  <div class="expenses__cateogires">

    {#each $cateogryStore as category }

      <div class="category__card">
        <div 
          class="category__content"
          role="button"
          tabindex="0"
          onmouseover={e => e.currentTarget.style.backgroundColor = category.color.hoverBgColor }
          onfocus={e => e.currentTarget.style.backgroundColor = category.color.hoverBgColor }
        
          onmouseout={e => e.currentTarget.style.backgroundColor = '' }
          onblur={e => e.currentTarget.style.backgroundColor = '' }

          onclick={() => handleOpenExpenseModal(category.id)}
          onkeydown={(e) => e.key === 'Enter' && handleOpenExpenseModal(category.id)}
        >
          <div 
            class="category__icon" 
            style="background-color: {category.color.iconBgColor};"
          >
            <Icon 
              icon='bx bx-{category.icon}'
              size={23}
              color={category.color.iconColor}
            />
          </div>
          <div class="category__details">
            <div class="category__title">
              {category.name}
            </div>
            <div 
              class="category__expense" 
              style="color: {category.color.textColor};"
            >
              <span>$</span>
              {
                groupedExpenses[category.id] ? groupedExpenses[category.id].total.toFixed(2) : '0.00'
              }
            </div>
          </div>
        </div>
      </div>

    {/each}

    <div class="category__card">
      <div 
        class="category__content"
        role="button"
        tabindex="0"

        onclick={e => {
          handleOpenCategoryModal()
        }}
        onkeydown={e => { 
          if(e.key === 'Enter' || e.key === ' '){
            handleOpenCategoryModal()
          }
        }}
      >
        <div class="category__icon">
          <Icon 
            icon='bx bx-plus'
            size={23}
          />
        </div>
        <div class="category__details">
          <div class="category__title">
            Add Category
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if isAddCategoryOpen}
  <Modal 
    title='ADD CATEGORY'
    handleCloseModal={handleCloseCategoryModal}
  >
    <AddCategory 
      {handleCloseCategoryModal}
    />
  </Modal>
{/if}

{#if isAddExpenseOpen}
  <Modal 
    title='ADD EXPENSE'
    handleCloseModal={handleCloseExpenseModal}
  >
    <AddExpense 
      {handleCloseExpenseModal}
      {selectedCategoryId}
    />
  </Modal>
{/if}

<style lang="scss">
  .expenses-tab{
    height: 100%;
    max-width: 1000px;
    width: 100%;

    .expenses__cateogires{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(5, 70px);
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      .category__card{

        .category__content{
          height: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 10px;

          border: 1.5px solid #383838;
          cursor: pointer;
          user-select: none;

          transition: background-color .2s, scale .15s;

          .category__icon{
            background-color: rgba($color: #ffffff, $alpha: .15);
            height: 100%;
            width: auto;
            aspect-ratio: 1 / 1;
            border-radius: 5px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin-right: 10px;

            color: rgba($color: rgb(255, 255, 255), $alpha: .4);
          }

          .category__details{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .category__title{
              font-size: 14px;
              font-weight: 300;
            }
            .category__expense{
              font-size: 17px;
              font-weight: 400;
              color: rgba($color: red, $alpha: .5);

              span{
                margin-right: 2px;
              }
            }
          }

          &:active{
            scale: .99;
          }
        }

        &:last-child{
          .category__content{
            border-style: dashed;

            .category__details{
              .category__title{
                font-size: 18px;
              }
            }

            &:hover{
              background-color: rgba($color: #ffffff, $alpha: .04);
            }
          }
        }
      }
    }
  }
</style>