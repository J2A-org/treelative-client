<script>
  import { mutation } from '@urql/svelte'
  import { fly, fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  import { LOGIN } from '../../graphql/mutations/auth'

  import Loading from '../Loading.svelte'

  const animation = { delay: 600, y: 25, duration: 750 }

  const login = mutation({ query: LOGIN })

  const dispatch = createEventDispatcher()
  const onComplete = () => dispatch('complete')

  let isLoading = false
  let errorMessage
  const handleSignIn = (e) => {
    isLoading = true
    errorMessage = null
    const input = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value
    }
    login({ input })
      .then(result => {
        if (result.data.login) {
          window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
          onComplete()
        } else {
          errorMessage = result.error.message
        }
      })
      .catch(error => {
        isLoading = false
        errorMessage = error.message
      })
  }
</script>

<div transition:fade='{{ delay: animation.delay - 100, duration: animation.duration - 250 }}'>
  {#if isLoading} <Loading /> {/if}
  <div
    in:fly='{{ delay: animation.delay - 250, y: animation.y + 125, duration: animation.duration + 250 }}'
    out:fly='{{ x: -500, opacity: 1, duration: 500 }}'
  >
    <h1 in:fly='{animation}'>Login</h1>
    {#if errorMessage}
      <h5 transition:fade='{{ duration: animation.duration - 250 }}'>
        Sorry, the username and password you entered did not match our records. <br> Please try again or <button>contact us</button>.
      </h5>
    {/if}
    <form on:submit|preventDefault={handleSignIn}>
      <input
        required
        type='username'
        name='username'
        placeholder='Username'
        in:fly='{{ ...animation, delay: animation.delay + 50 }}'
      />
      <input
        required
        type='password'
        name='password'
        placeholder='Password'
        in:fly='{{ ...animation, delay: animation.delay + 100 }}'
      />
      <button
        type='submit'
        in:fly='{{ ...animation, delay: animation.delay + 150 }}'
      >
        Sign In
      </button>
    </form>
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
        margin-top: 40px;
        margin-bottom: 20px;
        color: #26114D;
      }
      h5, button {
        margin: 0px;
        padding: 15px;
        text-align: center;
        background: rgba(255, 0, 0, 0.5);
        border-radius: 10px;
        font-size: 16px;
        font-weight: 400;
        button {
          border: none;
          background: none;
          padding: 0;
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            text-decoration: none;
          }
        }
      }
      form {
        text-align: center;
        input:first-child {
          margin-top: 20px;
        }
        input {
          width: 60%;
          height: 40px;
          margin-bottom: 20px;
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
          padding: 15px 0px;
          margin-top: 20px;
          border: 0px;
          cursor: pointer;
          border-radius: 20px;
          background: linear-gradient(-45deg, #3F2349, #F12A2D);
          background-size: 150% 150%;
          animation: gradient 5s ease infinite;
          margin-bottom: 40px;
        }
      }
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  }
</style>