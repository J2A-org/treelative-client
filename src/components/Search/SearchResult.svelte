<script>
  export let users
</script>

{#if users}
  {#each users as user}
    <div id='container'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3MMleJTsvxXrWLqg8XEeMcVgRkFu1okrTaQ&usqp=CAU'
        alt="user-avatar"
      />
      <div id='info'>
        <h1 id='full-name'>{user.fullName}</h1>
        <div style='display: flex;'>
          <h1 id='date-of-birth'>21/11/99</h1>
          <h1 id='current-location'>Italy, GE</h1>
        </div>
      </div>
    </div>
  {/each}
{/if}

<style lang="scss">
  #container {
    display: flex;
    align-items: center;
    width: 70vw;
    max-width: 300px;
    padding: 11px 15px;
    background: #FFFFFF;
    color: #062C4F;
    opacity: 0.9;
    box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  #container:hover {
    background: rgb(230, 230, 230);
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
  }
  #info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 17px;
  }
  #full-name {
    width: 215px;
    margin: 0px;
    font-weight: bold;
    font-size: 18px;
  }
  #date-of-birth, #current-location {
    font-size: 10px;
    font-weight: 300;
    margin: 0px;
  }
  #current-location {
    margin-left: 5px;
  }

</style>
