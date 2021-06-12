<script>
  import { onDestroy } from 'svelte'

  import { activeNodeID } from '../stores/activeNodeID'

  const unsubscribe = activeNodeID.subscribe(value => console.log(value))
  onDestroy(() => unsubscribe())
</script>

<div />

<style lang="scss">

</style>