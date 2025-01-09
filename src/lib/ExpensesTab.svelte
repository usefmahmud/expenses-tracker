EXPENSES

<script>
  import { storage } from "../store/storageManager";

</script>

<button
  onclick={() => {
    storage.store.update((x) => ({
      ...x,
      theme: 'light',
      actions: {
        actions: [],
        total_expenses: x.actions.total_expenses + 1,
        total_incomes: x.actions.total_incomes + 5
      },
      categories: [],
      personal_info: {
        name: 'dsfdf',
        avatar: 'w4234'
      }
    }))
  }}
>
  INCREMENT
</button>