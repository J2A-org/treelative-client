<script>
  import { quintOut } from 'svelte/easing'
  import { scale } from 'svelte/transition'
</script>

<div>
  <div in:scale='{{ delay: 1200, duration: 500, opacity: 0.5, start: 0 }}'/>
  <div in:scale='{{ delay: 1250, duration: 500, opacity: 0.5, start: 0 }}' id='smaller'/>
</div>

<style lang='scss'>
  div {
    div {
      width: 296px;
      height: 284px;
      position: absolute;
      margin-top: 28px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #FFFFFF;
      opacity: 0.2;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.20);
      border-radius: 20px;
    }
    #smaller {
      width: 278px;
    }
  }
</style>