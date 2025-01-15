<script lang="ts">
  export let title: string
</script>

<div class="card">
  <div class="card__title">
    {title}
  </div>
  <div class="card__content">
    <slot></slot>
  </div>
</div>