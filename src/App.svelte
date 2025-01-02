<script lang="ts">
  let msg = 'Hello, World'
  let isMsgShown = false

</script>

<button onclick={() => isMsgShown = !isMsgShown}>
  { isMsgShown ? 'Hide' : 'Show' }
</button>
<h1>
  { isMsgShown ? msg : '' }
</h1>