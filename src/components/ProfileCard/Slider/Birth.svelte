<script>
  import { getContext } from 'svelte'
  import { fly, scale } from 'svelte/transition'

  const animation = { delay: 1600, y: -25, duration: 600 }

  const user = getContext('user')
</script>


  <div in:scale='{{ delay: animation.delay - 300, duration: animation.duration - 100, opacity: 0.5, start: 0 }}'>
    <h1 in:fly='{animation}'>Date Of Birth</h1>
    <h1 in:fly='{{ ...animation, delay: animation.delay + 100 }}'>{user.dateOfBirth.slice(0, 10).replaceAll('-', '/')}</h1>
    <h1 in:fly='{{ ...animation, delay: animation.delay + 200 }}'>Birth Location</h1>
    <h1 in:fly='{{ ...animation, delay: animation.delay + 300 }}'>{user.birthLocation.terms.slice(-3).map(({ value }) => value).join(', ')}</h1>
    <iframe
      src='https://www.google.com/maps/embed/v1/place?key={import.meta.env.SNOWPACK_PUBLIC_GOOGLE_LOCATION_API_KEY}&q=place_id:{user.birthLocation.place_id}&zoom=10'
      loading='lazy'
      title='current-location'
      in:fly='{{ ...animation, delay: animation.delay + 400 }}'
    />
    <!-- <img
      src='https://i.stack.imgur.com/613d9.png'
      alt='birth-location'
      in:fly='{{ ...animation, delay: animation.delay + 400 }}'
    /> -->
  </div>


<style lang='scss'>
  div {
    width: 235px;
    height: 284px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.20);
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
      text-align: center;
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    iframe {
      width: 225px;
      height: 135px;
      margin-top: 15px;
      border: none;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
    }
  }
</style>