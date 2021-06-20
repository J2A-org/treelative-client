<script>
  import { fly, scale } from 'svelte/transition'

  import { GET_USER_2 } from '../../../graphql/queries/ProfileCard/user2'
  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID } from '../../../stores.js'

  import email from '../../../images/email.svg'
  import phone from '../../../images/phone.svg'
  import twitter from '../../../images/twitter.svg'
  import website from '../../../images/website.svg'
  import facebook from '../../../images/facebook.svg'
  import linkedin from '../../../images/linkedin.svg'
  import instagram from '../../../images/instagram.svg'

  const queryUser = operationStore(GET_USER_2, { id: null }, { pause: true })
  query(queryUser)
	const unsubscribe = activeNodeID.subscribe(value => {
    if (value) {
      $queryUser.context.pause = false
      $queryUser.variables.id = value
    }
	})
  // console.log(queryUser.data.user.socialLinks)
</script>

<div id='container' in:scale='{{ delay: 1300, duration: 500, opacity: 0.5, start: 0 }}'>
  {#if $queryUser.data}
    <h1 in:fly='{{ delay: 1600, y: -25, duration: 600 }}'>Current Location</h1>
    <h1 in:fly='{{ delay: 1700, y: -25, duration: 600 }}'>{queryUser.data.user.currentLocation.terms.slice(-3)[0].value}, {queryUser.data.user.currentLocation.terms.slice(-3)[1].value}, {queryUser.data.user.currentLocation.terms.slice(-3)[2].value}</h1>
    <!-- <iframe
      src='https://www.google.com/maps/embed/v1/place?key={import.meta.env.SNOWPACK_PUBLIC_GOOGLE_LOCATION_API_KEY}&q=place_id:{queryUser.data.user.currentLocation.place_id}&zoom=10'
      loading='lazy'
      title='current-location'
      in:fly='{{ delay: 2000, y: -25, duration: 600 }}'
    /> -->
    <img
      id='map'
      src='https://i.stack.imgur.com/613d9.png'
      alt='birth-location'
      in:fly='{{ delay: 1800, y: -25, duration: 600 }}'
    />
    <!-- <div in:fly='{{ delay: 1900, y: -25, duration: 600 }}'>
      <img src={facebook} alt='facebook' />
      <img src={instagram} alt='instagram' />
      <img src={twitter} alt='twitter' />
      <img src={phone} alt='phone' />
      <img src={email} alt='email' />
      <img src={website} alt='website' />
      <img src={linkedin} alt='linkedin' />
    </div> -->
  {/if}
</div>

<style lang='scss'>
  #container {
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
    h1:first-of-type {
      margin-bottom: 0px;
      opacity: 1;
      font-weight: 100;
      font-size: 7px;
      line-height: 8px;
    }
    h1:nth-of-type(2) {
      width: 70%;
      text-align: center;
      margin: 0px;
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    #map {
      width: 227px;
      height: 152px;
      margin-top: 15px;
      border: none;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
    }
    // div {
    //   margin-top: 15px;
    //   display: flex;
    //   height: 18px;
    //   img { 
    //     height: 100%;
    //     margin: 0px 9px;
    //     cursor: pointer;
    //   }
    // }
  }
</style>