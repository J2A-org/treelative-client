<script>
  import { fly, scale } from 'svelte/transition'

  import { GET_USER_1 } from '../../../graphql/queries/ProfileCard/user1'
  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../../stores.js'

  const queryUser = operationStore(GET_USER_1, { id: null }, { pause: true })
  query(queryUser)
	const unsubscribe = activeNodeID.subscribe(value => {
    if (value) {
      $queryUser.context.pause = false
      $queryUser.variables.id = value
    }
	})

  import tombstone from '../../../images/tombstone.svg'
</script>

<div in:scale='{{ delay: 1300, duration: 500, opacity: 0.5, start: 0 }}'>
  <h1 in:fly='{{ delay: 1600, y: -25, duration: 600 }}'>Date Of Death</h1>
  <h1 in:fly='{{ delay: 1700, y: -25, duration: 600 }}'>{queryUser.data.user.dateOfDeath.slice(0, 10)}</h1>
  <img
    src={tombstone}
    alt='tombstone'
    in:fly='{{ delay: 1800, y: -25, duration: 600 }}'
  />
  <h1 in:fly='{{ delay: 1900, y: -25, duration: 600 }}'>Death Location</h1>
  <h1 in:fly='{{ delay: 2000, y: -25, duration: 600 }}'>Paris, France</h1>
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