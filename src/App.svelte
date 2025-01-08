<script lang="ts">
  import { Router, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"
  import Navbar from "./lib/Navbar.svelte"

  import 'boxicons/css/boxicons.min.css'
  
</script>

<Router>
  <div class="main dark-mode">
    <aside class="side">
        <Navbar />
    </aside>
    <div class="container">
      <Route path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
    </div>
  </div>
</Router>