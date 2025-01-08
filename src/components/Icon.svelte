<script lang="ts">
  export let icon: string, color: string, size: number
</script>

<span>
  <i 
    class={icon} 
    style="color: {color}; font-size: {size}px"
  ></i>
</span>

<style>
  span {
    display: inline-block;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i {
    font-size: 24px;
  }
</style>

