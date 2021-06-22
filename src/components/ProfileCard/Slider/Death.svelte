<script>
  import { fly, scale } from 'svelte/transition'
  let a = { delay: 1600, y: -25, duration: 600 }

  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../../stores.js'
  import { BIRTH_AND_DEATH } from '../../../graphql/queries/ProfileCard/birthAndDeath'


  import tombstone from '../../../images/tombstone.svg'

  let queryUser
  $: {
    if ($activeNodeID) {
      queryUser = operationStore(BIRTH_AND_DEATH, { id: $activeNodeID })
      query(queryUser)
    }
  }
</script>

<div in:scale='{{ delay: a.delay - 300, duration: a.duration - 100, opacity: 0.5, start: 0 }}'>
  <h1 in:fly='{{ ...a }}'>Date Of Death</h1>
  <h1 in:fly='{{ ...a, delay: a.delay + 100 }}'>{queryUser.data.user.dateOfDeath.slice(0, 10).replaceAll('-', '/')}</h1>
  <img
    src={tombstone}
    alt='tombstone'
    in:fly='{{ ...a, delay: a.delay + 200 }}'
  />
  <h1 in:fly='{{ ...a, delay: a.delay + 300 }}'>Death Location</h1>
  <h1 in:fly='{{ ...a, delay: a.delay + 400 }}'>Paris, France</h1>
</div>

<style lang='scss'>
  div {
    width: 260px;
    height: 284px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-top: 28px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(255, 255, 255, 0.20);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.20);
    border-radius: 20px;
    color: #26114D;
    h1:first-child, h1:nth-child(4) {
      margin-bottom: 0px;
      opacity: 1;
      font-weight: 100;
      font-size: 7px;
      line-height: 8px;
    }
    h1:nth-child(4) { margin-top: 15px; }
    h1:nth-child(2), h1:nth-child(5) {
      margin: 0px;
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    img {
      width: 128px;
      height: 128px;
      margin-top: 15px;
      filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.25));
    }
  }
</style>