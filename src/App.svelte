<script lang="ts">
  import { Router, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"
  import Navbar from "./lib/Navbar.svelte"
  import Header from "./lib/Header.svelte";
  import {Toaster} from 'svelte-french-toast'

  import 'boxicons/css/boxicons.min.css'
  import { storage } from "./store/storageManager";
  import type { Data } from "./utils/types";

  let appData: Data | null = null
  const store = storage.store
  $: appData = $store

  $: console.log(appData)
</script>

<Router>
  <div class="main {appData.theme === 'dark' ? 'dark-mode' : ''}">
    <aside class="side">
      <Navbar />
    </aside>
    <div class="container">
      <Header 
      theme={appData.theme}
      toggleTheme={storage.toggleTheme}
      />
      <main>
        <Route path="/" component={Dashboard} />
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