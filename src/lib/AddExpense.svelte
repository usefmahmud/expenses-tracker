<script lang="ts">
  import Icon from "../components/Icon.svelte";
  import { storage } from "../store/storageManager"
  import { defaultCategories } from "../utils/db";
  import type { Category, Expense } from "../utils/types";
  import { toast } from 'svelte-french-toast'

  export let handleCloseExpenseModal
  export let selectedCategoryId

  const expensesManager = storage.expensesManager
  const categoriesManager = storage.categoriesManager

  const selectedCategory = categoriesManager.getCategoryById(selectedCategoryId) ?? defaultCategories[0]
  

  const expenseData: Omit<Expense, 'id' | 'date'> = {
    type: 'expense',
    title: '',
    amount: 0,
    category: selectedCategoryId
  } 

  let formattedExpenseAmount = '$0.00'
  const handleFormatedExpenseAmount = (e: Event) => {
    const input = (e.currentTarget as HTMLInputElement);
    let val = input.value.replace(/[^0-9]/g, '');
    if (val === '') {
      val = '0';
    }

    const numericValue = parseFloat(val) / 100;
    expenseData.amount = numericValue;

    formattedExpenseAmount = `$${numericValue.toFixed(2)}`;

    input.setSelectionRange(formattedExpenseAmount.length, formattedExpenseAmount.length);
  }

  let isTitleFieldActive = false
  const handleTitleFieldActive = (e: FocusEvent) => {
    if(e.type === 'focus'){
      isTitleFieldActive = true
    }else{
      if(expenseData.title === ''){
        isTitleFieldActive = false
      }
    }
  }

  const handleAddExpense = () => {
    if(expenseData.title.replaceAll(' ', '') === ''){
      toast.error('expense title cannot be empty', {
        style: 'font-size: 14px'
      })
      return
    }
    
    if(expenseData.amount <= 0){
      toast.error('expense amount must have a value', {
        style: 'font-size: 14px'
      })
      return
    }

    expensesManager.addExpense(expenseData)
    toast.success('expense added successfully')
    handleCloseExpenseModal()
  } 


  // upcoming feature
  const handleChangeCategory = () => {
    toast.error('will be implemented in the future')
  }
</script>

<div class="add-expense">
  <div class="add-expense__form">
    <div class="form__input-data">
      <div class="form__expense">
        <input 
          class="expense__input"
          bind:value={formattedExpenseAmount}
          oninput={handleFormatedExpenseAmount}

          placeholder="$0.00"
        >
      </div>

      <div class="form__field">
        <span 
          class="field__title"
          class:field__title--active={isTitleFieldActive}
        >Title</span>
        <input 
          type="text" 
          class="field__input"
          onfocus={handleTitleFieldActive}
          onblur={handleTitleFieldActive}
          
          bind:value={expenseData.title}
        >
      </div>
    </div>

    <div class="form__buttons">
      <div 
        class="form__buttons-category"
        role="button"
        tabindex="0"
        onmouseover={e => e.currentTarget.style.backgroundColor = selectedCategory?.color.hoverBgColor }
        onfocus={e => e.currentTarget.style.backgroundColor = selectedCategory?.color.hoverBgColor }
      
        onmouseout={e => e.currentTarget.style.backgroundColor = '' }
        onblur={e => e.currentTarget.style.backgroundColor = '' }

        onclick={handleChangeCategory}
        onkeydown={handleChangeCategory}
      >
        <div 
          class="category__icon"
          style="
            background-color: {selectedCategory.color.iconBgColor};
            color: {selectedCategory.color.iconColor};
          "
        >
          <Icon
            icon='bx bx-{selectedCategory.icon}'
            size={30}
          />
        </div>
        <div class="category__name">
          {selectedCategory.name}
        </div>
      </div>

      <div class="form__buttons-add">
        <button 
          class="add__btn"
          onclick={handleAddExpense}
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">

  .add-expense{
    height: 100%;

    .add-expense__form{
      height: 100%;

      .form__input-data{

        .form__expense{
          display: flex;
          justify-content: center;
          padding: 10px 0;

          .expense__input{
            background-color: transparent;
            outline: none;
            border: none;
            text-align: center;
            color: #762353;
            font-size: 48px;
            font-family: 'Inter';
            font-weight: 500;
            max-width: 80%;
            letter-spacing: 2px;
          }
        }

        .form__field{
          position: relative;
          display: flex;
          padding: 20px 0;
          
          .field__title{
            position: absolute;
            font-weight: bold;
            font-size: 14px;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            user-select: none;
            opacity: .7;
            letter-spacing: .5px;
            transition: .1s;

            &.field__title--active{
              transform: translateY(0);
              top: -2px;
              left: 10px;
              font-size: 12;
            }
          }
          
          .field__input{
            width: 100%;
            background-color: var(--active-bg-color);
            border: none;
            outline: none;
            font-size: 20px;
            border-radius: 5px;
            padding: 10px 12px;
            color: var(--text-color);
            letter-spacing: 1px;
            font-weight: 300;
            font-family: 'Inter';
          }
        }

      }
      
      .form__buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .form__buttons-category{
          width: 80%;
          flex: 1;
          display: flex;
          border: 1px solid #383838;
          padding: 10px;
          cursor: pointer;
          user-select: none;
          border-radius: 10px;
          margin-bottom: 20px;
          transition: scale .15s;

          .category__icon{
            height: 40px;
            width: 40px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
          }


          &:active{
            scale: .99;
          }
        }

        .form__buttons-add{
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;

          .add__btn{
            width: 50%;
            border: none;
            background-color: var(--active-bg-color);
            color: var(--text-color);
            font-family: 'Inter';
            font-weight: 400;
            letter-spacing: 1px;

            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
            user-select: none;

            &:hover{
              background-color: var(--active-hover-color);
            }
            
            &:active{
              scale: .98;
            }
          }
        }
      }
    }
  }
</style>