<script lang="ts">
  import { Router, Link, Route } from "svelte-routing"
  import Dashboard from "./routes/Dashboard.svelte"
  import Settings from "./routes/Settings.svelte"

  let msg = 'Hello, World'
  let isMsgShown = false

</script>

<Router>
  <button onclick={() => isMsgShown = !isMsgShown}>
    { isMsgShown ? 'Hide' : 'Show' }
  </button>
  <h1>
    { isMsgShown ? msg : '' }
  </h1>

  <Route path="/" component={Dashboard} />
  <Route path="/settings" component={Settings} />
</Router>