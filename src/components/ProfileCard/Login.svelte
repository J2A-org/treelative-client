<script>
  export let onComplete

  import { fly, fade } from 'svelte/transition'
  let a = { delay: 600, y: 25, duration: 750 }

  import { mutation } from '@urql/svelte'

  import { LOGIN } from '../../graphql/mutations/login'

  const login = mutation({ query: LOGIN })

  const handleSignIn = (e) => {
    login({ username: e.target[0].value, password: e.target[1].value })
      .then(result => {
        if (result.data.login) {
          window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
          onComplete()
        } else console.log(result.error.message)
      })
      .catch(console.log)
  }
</script>

<div transition:fade='{{ delay: a.delay - 100, duration: a.duration - 250 }}'>
  <div
    in:fly='{{ delay: a - 250, y: a + 125, duration: a + 250 }}'
    out:fly='{{ x: -500, opacity: 1, duration: 500 }}'
  >
    <h1 in:fly='{{ ...a }}'>Login</h1>
    <form on:submit|preventDefault={handleSignIn}>
      <input
        required
        type='username'
        name='username'
        placeholder='Username'
        in:fly='{{ ...a, delay: a.delay + 50 }}'
      />
      <input
        required
        type='password'
        name='password'
        placeholder='Password'
        in:fly='{{ ...a, delay: a.delay + 100 }}'
      />
      <button
        type='submit'
        in:fly='{{ ...a, delay: a.delay + 150 }}'
      >
        Sign In
      </button>
    </form>
    <button in:fly='{{ ...a, delay: a.delay + 15 }}'>Forgot Password?</button>
  </div>
</div>

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    div {
      width: 330px;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 20px;
      h1 {
        font-size: 30px;
        margin: 40px 0px;
        color: #26114D;
      }
      form {
        text-align: center;
        input {
          width: 60%;
          height: 40px;
          margin-bottom: 30px;
          padding: 0px 15px;
          border: none;
          background: none;
          outline: none;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          &:hover { border: 1px solid rgba(0, 0, 0, 0.5); }
          &:focus {
            border-image-slice: 1;
            border-image-source: linear-gradient(to left, #3F2349, #F12A2D);
          }
        }
        ::placeholder {
          color: rgba(0, 0, 0, 0.9);
          opacity: 1;
        }
        button {
          width: 70%;
          font-size: 16px;
          color: white;
          padding: 10px 0px;
          margin-top: 10px;
          border: 0px;
          cursor: pointer;
          border-radius: 20px;
          background: linear-gradient(-45deg, #3F2349, #F12A2D);
          background-size: 150% 150%;
          a: gradient 5s ease infinite;
        }
      }
      & > button {
        font-size: 14px;
        background: none;
        margin: 10px 0px;
        margin-bottom: 20px;
        color: #26114D;
        border: 0px;
        cursor: pointer;
        &:hover { text-decoration: underline; }
      }
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  }
</style>