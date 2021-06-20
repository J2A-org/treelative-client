<script>
  import { scale } from 'svelte/transition'
  
  import { GET_USER_1 } from '../../graphql/queries/ProfileCard/user1'
  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../stores.js'

  const queryUser = operationStore(GET_USER_1, { id: null }, { pause: true })
  query(queryUser)
	const unsubscribe = activeNodeID.subscribe(value => {
    if (value) {
      $queryUser.context.pause = false
      $queryUser.variables.id = value
    }
	})

  import Death from './Slider/Death.svelte'
  // import Birth from './Slider/Birth.svelte'
  import Social from './Slider/Social.svelte'
</script>

<div>
  <div>
    <!-- <button>Back</button>
    <button>Next</button> -->
  </div>
  <div in:scale='{{ delay: 1200, duration: 500, opacity: 0.5, start: 0 }}'/>
  <div in:scale='{{ delay: 1250, duration: 500, opacity: 0.5, start: 0 }}' id='smaller'/>
  {#if queryUser.data.user.dateOfDeath}
    <Death />
  {:else if queryUser.data.user.dateOfBirth}
    <!-- <Birth /> -->
    <Social />
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