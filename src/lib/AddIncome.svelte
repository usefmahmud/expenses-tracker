<script lang="ts">
  import Icon from "../components/Icon.svelte";
  import { storage } from "../store/storageManager"
  import type { Income } from "../utils/types";
  import { toast } from 'svelte-french-toast'

  export let handleCloseIncomeModal

  const incomesManager = storage.incomesManager

  const incomeData: Omit<Income, 'id' | 'date'> = {
    type: 'income',
    title: '',
    amount: 0
  } 

  let formattedIncomeAmount = '$0.00'
  const handleFormatedIncomeAmount = (e: Event) => {
    const input = (e.currentTarget as HTMLInputElement);
    let val = input.value.replace(/[^0-9]/g, '');
    if (val === '') {
      val = '0';
    }

    const numericValue = parseFloat(val) / 100;
    incomeData.amount = numericValue;

    formattedIncomeAmount = `$${numericValue.toFixed(2)}`;

    input.setSelectionRange(formattedIncomeAmount.length, formattedIncomeAmount.length);
  }

  let isTitleFieldActive = false
  const handleTitleFieldActive = (e: FocusEvent) => {
    if(e.type === 'focus'){
      isTitleFieldActive = true
    }else{
      if(incomeData.title === ''){
        isTitleFieldActive = false
      }
    }
  }

  const handleAddIncome = () => {
    if(incomeData.title.replaceAll(' ', '') === ''){
      toast.error('income title cannot be empty', {
        style: 'font-size: 14px'
      })
      return
    }
    
    if(incomeData.amount <= 0){
      toast.error('income amount must have a value', {
        style: 'font-size: 14px'
      })
      return
    }

    incomesManager.addIncome(incomeData)
    toast.success('income added successfully')
    handleCloseIncomeModal()
  } 
</script>

<div class="add-income">
  <div class="add-income__form">
    <div class="form__input-data">
      <div class="form__income">
        <input 
          class="income__input"
          bind:value={formattedIncomeAmount}
          oninput={handleFormatedIncomeAmount}
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
          bind:value={incomeData.title}
        >
      </div>
    </div>

    <div class="form__buttons">
      <div class="form__buttons-add">
        <button 
          class="add__btn"
          onclick={handleAddIncome}
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .add-income{
    height: 100%;

    .add-income__form{
      height: 100%;

      .form__input-data{

        .form__income{
          display: flex;
          justify-content: center;
          padding: 10px 0;

          .income__input{
            background-color: transparent;
            outline: none;
            border: none;
            text-align: center;
            color: #195d5b;
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
