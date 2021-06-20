<script>
  import { getContext } from 'svelte'
  const user = getContext('user')

  import { fly, scale } from 'svelte/transition'

  import tombstone from '../../../images/tombstone.svg'
</script>

<div in:scale='{{ delay: 1300, duration: 500, opacity: 0.5, start: 0 }}'>
  <h1 in:fly='{{ delay: 1600, y: -25, duration: 600 }}'>Date Of Death</h1>
  <h1 in:fly='{{ delay: 1700, y: -25, duration: 600 }}'>{user.dateOfDeath.slice(0, 10)}</h1>
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
      margin-top: 31px;
      margin-bottom: 0px;
      opacity: 1;
      font-weight: 100;
      font-size: 7px;
      line-height: 8px;
    }
    h1:nth-child(4) { margin-top: 17px; }
    h1:nth-child(2), h1:nth-child(5) {
      margin: 0px;
      font-weight: 100;
      font-size: 18px;
      line-height: 22px;
      color: #26114D;
    }
    img {
      width: 128px;
      height: 128px;
      margin-top: 16px;
      filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.25));
    }
  }
</style>