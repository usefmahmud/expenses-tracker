<script lang="ts">
  import { Router, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"
  import Navbar from "./lib/Navbar.svelte"

  import 'boxicons/css/boxicons.min.css'
  import Header from "./lib/Header.svelte";
  
</script>

<Router>
  <div class="main dark-mode">
    <aside class="side">
        <Navbar />
    </aside>
    <div class="container">
      <Header />
      <main>
        <Route path="/" component={Dashboard} />
        <Route path="/settings" component={Settings} />
      </main>
    </div>
  </div>
</Router>

<style lang="scss">
  .main{
    background-color: var(--primary-bg-color);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    
    height: 100vh;
    width: 100vw;

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
    }
  }
</style>