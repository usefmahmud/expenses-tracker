<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import { storage } from "../store/storageManager";
  import { defaultCategoryColors, defaultCategoryIcons } from "../utils/db"
  import type { Category, CategoryColor } from "../utils/types"
  import { toast } from "svelte-french-toast";
  
  export let handleCloseCategoryModal

  const categoryManager = storage.categoriesManager

  const categoryData: Omit<Category, 'id'> = {
    name: '',
    icon: defaultCategoryIcons[0],
    color: defaultCategoryColors[0]
  }

  let isTitleFieldActive = false
  const handleTitleFieldActive = (e: FocusEvent) => {
    if(e.type === 'focus'){
      isTitleFieldActive = true
    }else{
      if(categoryData.name === ''){
        isTitleFieldActive = false
      }
    }
  }

  const handleSelectedIcon = (icon: string) => {
    categoryData.icon = icon
  }

  const handleSelectedColor = (color: CategoryColor) => {
    categoryData.color = color
  }

  const handleAddCategory = () => {
    if(categoryData.name.replaceAll(' ', '') === ''){
      toast.error("category name cannot be empty")
      return
    }

    categoryManager.addCategory(categoryData)
    toast.success('category added successfully')
    handleCloseCategoryModal()
  }
</script>

<div class="add-category">
  <div class="add-category__form">
    <div class="form__input-data">
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
          
          bind:value={categoryData.name}
        >
      </div>

      <div class="form__select-icon">
        <div class="select-icon__grid">
          {#each defaultCategoryIcons as categoryIcon }
            <div class="grid__cell">
              <div 
                role="button"
                tabindex="0"
                class="icon"
                class:icon--selected={categoryData.icon === categoryIcon}

                onclick={() => handleSelectedIcon(categoryIcon)}
                onkeydown={(e) => e.key === 'Enter' && handleSelectedIcon(categoryIcon)}

                aria-label="Select icon {categoryIcon}"
                
                style='{
                  categoryData.icon === categoryIcon ? 
                  `
                    background-color: ${categoryData.color.iconBgColor};
                    color: ${categoryData.color.iconColor}  
                  ` 
                  : ''}'
              >
                <Icon
                  icon='bx bx-{categoryIcon}'
                  size={24}
                />
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="form__select-color">
        <div class="select-color__grid">
          {#each defaultCategoryColors as categoryColor }
            <div class="grid__cell">
              <div 
                role="button"
                tabindex="0"
                class="grid__color {categoryData.color.iconColor === categoryColor.iconColor && 'grid__color--selected'}" 
                style="background-color: {categoryColor.iconBgColor};"

                onclick={() => handleSelectedColor(categoryColor)}

                onkeydown={(e) => e.key === 'Enter' && handleSelectedColor(categoryColor)}

                aria-label="Select color {categoryColor.colorName}"
              ></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="form__buttons">
      <button 
        class="form__buttons-btn"
        onclick={handleAddCategory}
      >
        ADD
      </button>
    </div>
  </div>
</div>

<style lang="scss">
  .add-category{
    height: 100%;

    .add-category__form{
      height: 100%;
      // background-color: blue;

      .form__input-data{
        display: flex;
        flex-direction: column;

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

        .form__select-icon{
          padding: 5px 0;
          .select-icon__grid{
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            .grid__cell{
              display: flex;
              justify-content: center;
              align-items: center;
              height: auto;
              aspect-ratio: 1 / 1;
              padding: 10px;

              .icon{
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 5px;
                &:hover{
                  background-color: var(--active-bg-color);
                }

                &:active{
                  scale: .97;
                }

                &.icon--selected{
                  background-color: var(--active-bg-color);
                }
              }
            }
          }
        }

        .form__select-color{
          padding: 5px 0;

          .select-color__grid{
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            .grid__cell{
              display: flex;
              justify-content: center;
              align-items: center;
              height: auto;
              aspect-ratio: 1 / 1;
              padding: 10px;

              .grid__color{
                width: 100%;
                height: auto;
                aspect-ratio: 1 / 1;
                border-radius: 50%;

                cursor: pointer;

                &:active{
                  scale: .97;
                }

                &.grid__color--selected{
                  border: 2px solid var(--text-color);
                }
              }
            }
          }
        }
      }

      .form__buttons{
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .form__buttons-btn{
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
</style>