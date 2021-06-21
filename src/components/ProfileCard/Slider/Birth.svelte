<script>
  import { fly, scale } from 'svelte/transition'
  let animation = { delay: 1600, y: -25, duration: 600 }

  import { BIRTH_AND_DEATH } from '../../../graphql/queries/ProfileCard/birthAndDeath'
  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../../stores.js'

  let queryUser
  $: {
    if ($activeNodeID) {
      queryUser = operationStore(BIRTH_AND_DEATH, { id: $activeNodeID })
      query(queryUser)
    }
  }
</script>

<div in:scale='{{ delay: 1300, duration: 500, opacity: 0.5, start: 0 }}'>
  <h1 in:fly='{{ ...animation }}'>Date Of Birth</h1>
  <h1 in:fly='{{ ...animation, delay: animation.delay + 100 }}'>{queryUser.data.user.dateOfBirth.slice(0, 10)}</h1>
  <h1 in:fly='{{ ...animation, delay: animation.delay + 200 }}'>Birth Location</h1>
  <h1 in:fly='{{ ...animation, delay: animation.delay + 300 }}'>{queryUser.data.user.birthLocation.terms.slice(-3).map(val => val.value).join(', ')}</h1>
  <!-- <iframe
    src='https://www.google.com/maps/embed/v1/place?key={import.meta.env.SNOWPACK_PUBLIC_GOOGLE_LOCATION_API_KEY}&q=place_id:{queryUser.data.user.birthLocation.place_id}&zoom=10'
    loading='lazy'
    title='current-location'
    in:fly='{{ ...animation, delay: animation.delay + 400 }}'
  /> -->
  <img
    src='https://i.stack.imgur.com/613d9.png'
    alt='birth-location'
    in:fly='{{ ...animation, delay: animation.delay + 400 }}'
  />
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
    user-select: none;
    cursor: move;
    h1:first-child, h1:nth-child(3) {
      margin-bottom: 0px;
      opacity: 1;
      font-weight: 100;
      font-size: 7px;
      line-height: 8px;
    }
    h1:nth-child(3) { margin-top: 15px; }
    h1:nth-child(2), h1:nth-child(4) {
      margin: 0px;
      width: 85%;
      max-height: 44px;
      text-align: center;
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    img {
      width: 225px;
      height: 135px;
      margin-top: 15px;
      border: none;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
    }
  }
</style>