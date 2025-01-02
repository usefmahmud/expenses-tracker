<script lang="ts">
  import { Router, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"
  import Navbar from "./lib/Navbar.svelte"
  
  import BurgerButton from "./components/BurgerButton.svelte";

  let isNavOpen: boolean = true
  let openNav: () => void = () => {
    isNavOpen = !isNavOpen
  }

</script>

<Router>
  <div class="main dark-mode">
    <div class="side {isNavOpen ? 'side--opened' : ''}">
        <Navbar />
    </div>
    <div class="container">
      <BurgerButton isOpen={isNavOpen} onClick={openNav}/>

      <Route path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
    </div>
  </div>
</Router>