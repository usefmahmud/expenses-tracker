<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import Icon from "./Icon.svelte"
  export let title: string
  export let handleCloseCategoryModal

  let ModalElement: HTMLDivElement
  onMount(() => {
    if(ModalElement){
      document.querySelector('.main')?.appendChild(ModalElement)
      ModalElement.focus()
    }
  })

  onDestroy(() => {
    if(ModalElement){
      document.querySelector('.main')?.removeChild(ModalElement)
    }
  })

  

</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div 
  bind:this={ModalElement}
  class="modal" 
  role="dialog"
  tabindex="-1"
  onclick={e => {
    if(e.target === ModalElement){
      handleCloseCategoryModal()
    }
  }}
  onkeydown={e => {
    console.log(e.key)
    if(e.key === 'Escape'){
      handleCloseCategoryModal()
    }
  }}

  transition:fade={{duration: 80}}
>
  <div class="modal__container">
    <div class="modal__header">
      <div class="modal__title">
        {title}
      </div>
      <div class="modal__close">
        <button 
          type="button" 
          class="modal__close-btn"
          aria-label="Close"
          onclick={handleCloseCategoryModal}
          onkeydown={e => {
            if(e.key === 'Enter' || e.key === ' '){
              handleCloseCategoryModal()
            }
          }}
        >
          <Icon
            icon='bx bx-x'
            size={18}
          />
        </button>
      </div>
    </div>
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</div>

<style lang="scss">
  .modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    
    .modal__container{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: 100%;
      max-height: 700px;
      max-width: 500px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      background-color: var(--primary-bg-color);
      box-shadow: 0px 0px 15px var(--hover-color);

      border-radius: 10px;

      padding: 30px 25px;

      .modal__header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-bottom: 25px;

        &::after{
          content: '';
          position: absolute;
          height: 1px;
          width: 95%;

          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          
          background-color: var(--text-color);
          opacity: 0.1;
        }

        .modal__title{
          font-size: 18px;
          font-weight: bold;
        }

        .modal__close{
          .modal__close-btn{
            background-color: var(--active-bg-color);
            border: none;
            padding: 5px;
            color: var(--text-color);
            cursor: pointer;
            border-radius: 5px;

            transition: background-color .2s, scale .15s;
            &:hover{
              background-color: var(--active-hover-color);
            }
            
            &:active{
              scale: .97;
            }
          }
        }
      }

      .modal__content{
        height: 100%;
        width: 100%;
        // background-color: red;
      }
    }
  }
</style>