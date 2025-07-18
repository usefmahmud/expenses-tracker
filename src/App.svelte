<script lang="ts">
  import { Router, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"
  import ExpensesHistory from "./routes/ExpensesHistory.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import Header from "./lib/Header.svelte";
  import {Toaster} from 'svelte-french-toast'

  import 'boxicons/css/boxicons.min.css'
  import { storage } from "./store/storageManager";

  const themeManager = storage.themeManager
  const themeStore = storage.themeManager.theme

</script>

<Router>
  <div class="main {$themeStore === 'dark' ? 'dark-mode' : ''}">
    <aside class="side">
      <Navbar />
    </aside>
    <div class="container">
      <Header 
        theme={$themeStore}
        toggleTheme={(x: 'dark' | 'light') => themeManager.setTheme(x)}
      />
      <main>
        <Route path="/" component={Dashboard} />
        <Route path="/expenses-history" component={ExpensesHistory} />
        <Route path="/settings" component={Settings} />
      </main>
    </div>

    <Toaster />
  </div>
</Router>

<style lang="scss">
  .main{
    background-color: var(--primary-bg-color);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    
    height: 100vh;
    width: 100vw;
    position: relative;

    padding: 30px 25px 30px 5px;

    display: flex;
    
    .side{
        width: 330px;
    }

    .container{
      width: 100%;
      height: 100%;
      padding: 35px 40px;
      
      background-color: var(--secondary-bg-color);

      display: flex;
      flex-direction: column;

      main{
        height: 100%;
        overflow: hidden;
      }
    }
  }
</style>