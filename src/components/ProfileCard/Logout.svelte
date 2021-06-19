<script>
  const handleSignOut = () => {
    window.localStorage.removeItem('AUTH_SESSION_ID')
    window.location.reload()
  }
</script>

<div>
    <button on:click={handleSignOut}>
      Logout
    </button>
</div>

<style lang='scss'>
  button {
    width: 12%;
    font-size: 10px;
    color: white;
    padding: 10px 0px;
    margin-top: 10px;
    outline: none;
    border: 0px;
    cursor: pointer;
    position: absolute;
    border-radius: 20px;
    background: linear-gradient(-45deg, #3F2349, #F12A2D);
    background-size: 150% 150%;
    animation: gradient 2s ease infinite;
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>