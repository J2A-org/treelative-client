<script>
  const handleSignOut = () => { window.localStorage.removeItem('AUTH_SESSION_ID') }
</script>

<div>
    <button on:click={handleSignOut}>
      Logout
    </button>
</div>

<style lang='scss'>
  button {
    width: 70%;
    font-size: 16px;
    color: white;
    padding: 10px 0px;
    margin-top: 10px;
    outline: none;
    border: 0px;
    cursor: pointer;
    border-radius: 20px;
    background: linear-gradient(-45deg, #3F2349, #F12A2D);
    background-size: 150% 150%;
    animation: gradient 5s ease infinite;
  }
</style>