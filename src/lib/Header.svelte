<script lang="ts">
  import Icon from '../components/Icon.svelte';
  import { getGreeting } from '../utils/helpers'
  import type { Data } from '../utils/types'

  export let theme: Data['theme'], toggleTheme
</script>

<div class="header">
  <div class="header__welcome-message">
    <h1>{getGreeting()}</h1>
  </div>
  <div class="header__buttons">
    <button 
      class="header__buttons-btn"
      onclick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Icon
        icon={theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon'}
        size={20}
      />
    </button>
  </div>
</div>

<style lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 30px;

    .header__buttons{
      display: flex;
      
      .header__buttons-btn{
        padding: 5px;

        background-color: #28282a;
        color: var(--text-color);
        transition: background-color .2s;
        
        border: 1px solid #383838;
        border-radius: 3px;

        cursor: pointer;

        &:not(:first-child){
          margin-left: 10px;
        }

        &:hover{
          background-color: #3d3d3f;
        }
      }
    }
  }
</style>