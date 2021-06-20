<script>
  import { getContext } from 'svelte'
  const user = getContext('user')

  import { fly, scale } from 'svelte/transition'
  console.log(import.meta.env.SNOWPACK_GOOGLE_LOCATION_API_KEY)
</script>

<div
  in:scale='{{ delay: 1300, duration: 500, opacity: 0.5, start: 0 }}'
>
  <h1 in:fly='{{ delay: 1600, y: -25, duration: 600 }}'>Date Of Birth</h1>
  <h1 in:fly='{{ delay: 1700, y: -25, duration: 600 }}'>{user.dateOfBirth.slice(0, 10)}</h1>
  <h1 in:fly='{{ delay: 1800, y: -25, duration: 600 }}'>Birth Location</h1>
  <h1 in:fly='{{ delay: 1900, y: -25, duration: 600 }}'>{user.birthLocation.terms.slice(-2)[0].value}, {user.birthLocation.terms.slice(-2)[1].value}</h1>
  <iframe
    src='https://www.google.com/maps/embed/v1/place?key={import.meta.env.SNOWPACK_GOOGLE_LOCATION_API_KEY}&q=place_id:{user.birthLocation.place_id}&zoom=10'
    loading='lazy'
    title='current-location'
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
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    iframe {
      width: 227px;
      height: 152px;
      margin-top: 15px;
      border: none;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
    }
  }
</style>