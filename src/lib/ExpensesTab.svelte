<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import Modal from "../components/Modal.svelte";
  import { storage } from "../store/storageManager";
  import { expensesByCategory } from "../utils/helpers";
  import type { Data } from "../utils/types";
  import AddCategory from "./AddCategory.svelte";

  let data: Data | null = null
  let groupedExpenses = []
  const store = storage.store
  $: data = $store
  $: groupedExpenses = expensesByCategory(data.actions.actions.filter(action => action.type === 'expense'), data.categories)

  let isAddCategoryOpen: boolean = false
  const handleCloseCategoryModal = () => {
    isAddCategoryOpen = false
  }
  const handleOpenCategoryModal = () => {
    isAddCategoryOpen = true
  }
</script>

<div class="expenses-tab">
  <div class="expenses__cateogires">

    {#each data.categories as category }

      <div class="category__card">
        <div 
          class="category__content"
          role="button"
          tabindex="0"
          onmouseover={e => e.currentTarget.style.backgroundColor = category.color.hoverBgColor }
          onfocus={e => e.currentTarget.style.backgroundColor = category.color.hoverBgColor }
        
          onmouseout={e => e.currentTarget.style.backgroundColor = '' }
          onblur={e => e.currentTarget.style.backgroundColor = '' }
        >
          <div 
            class="category__icon" 
            style="background-color: {category.color.iconBgColor};"
          >
            <Icon 
              icon={category.icon}
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
                groupedExpenses
                  .find(c => c.id === category.id)
                  ?.expenses.reduce((prev, curr) => prev + curr.amount, 0)
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
            Add
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if isAddCategoryOpen}
  <Modal 
    title='ADD CATEGORY'
    {handleCloseCategoryModal}
  >
    <AddCategory />
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