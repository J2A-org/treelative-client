<script>
  import { scale } from 'svelte/transition'
  let animation = { delay: 1200, duration: 500, opacity: 0.5, start: 0 }
  
  import { BIRTH_AND_DEATH } from '../../graphql/queries/ProfileCard/birthAndDeath'
  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../stores.js'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  let queryUser
  $: {
    if ($activeNodeID) {
      queryUser = operationStore(BIRTH_AND_DEATH, { id: $activeNodeID })
      query(queryUser)
    }
  }
</script>

<div>
  <div>
    <button>Back</button>
    <button>Next</button>
  </div>
  <div in:scale='{{ ...animation }}'/>
  <div in:scale='{{ ...animation, delay: animation.delay + 50 }}' id='smaller'/>
  {#if queryUser.data.user.dateOfDeath} <Death />
  {:else if queryUser.data.user.dateOfBirth && queryUser.data.user.birthLocation} <Birth />
  {:else if queryUser.data.user.currentLocation}  <Current />
  {/if}
</div>

<style lang='scss'>
  div {
    div:first-child {
      width: 270px;
      display: flex;
      justify-content: space-between;
      margin-top: -70px;
    }
    div:nth-child(2), div:nth-child(3) {
      width: 296px;
      height: 284px;
      position: absolute;
      margin-top: 28px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: rgba(255, 255, 255, 0.20);
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.20);
      border-radius: 20px;
    }
    #smaller {
      width: 278px;
    }
  }
</style>