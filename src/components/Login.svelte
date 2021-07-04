<script>
  import { mutation } from '@urql/svelte'
  import { fly, fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  import { Diamonds } from 'svelte-loading-spinners'

  import { showContactDialog } from '@app/stores.js'

  import { createForm } from 'svelte-forms-lib'

  import { LOGIN, LOGIN_WITH_PROVIDER } from '@app/graphql/mutations/auth'

  import LoginWithProvider from '@app/components/Login/LoginWithProvider.svelte'
  import { google, twitter, facebook } from '@app/utils/firebase'
  import { faHippo, faCat, faCrow } from '@fortawesome/free-solid-svg-icons'

  const loginProviders = [
    { label: 'Login with Google', icon: faHippo, provider: google },
    { label: 'Login with Facebook', icon: faCat, provider: facebook },
    { label: 'Login with Twitter', icon: faCrow, provider: twitter }
  ]

  const loginWithPassword = mutation({ query: LOGIN })
  const loginWithProvider = mutation({ query: LOGIN_WITH_PROVIDER })

  const dispatch = createEventDispatcher()
  const onComplete = () => dispatch('complete')

  let isLoading = false
  let errorMessage

  const onLoginSuccess = (result) => {
    if (result.data) {
      window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
      onComplete()
    } else {
      errorMessage = result.error.message
    }
  }

  const { form, handleSubmit } = createForm({
    onSubmit: input => {
      isLoading = true
      errorMessage = null
      loginWithPassword({ input })
      .then(onLoginSuccess)
      .catch(error => {
        isLoading = false
        errorMessage = error.message
      })
    }
  })

  const onLoginWithProvider = (token, { email }) => {
    loginWithProvider({ email, token })
      .then(onLoginSuccess)
      .catch(error => {
        isLoading = false
        errorMessage = error.message
      })
  }

  const animation = { delay: 600, y: 25, duration: 750 }
</script>

<div class="outer-container" in:fade={{ delay: animation.delay - 100, duration: animation.duration - 250 }}>
  <div
    class="inner-container"
    in:fly={{ delay: animation.delay - 250, y: animation.y + 125, duration: animation.duration + 250 }}
    out:fly={{ x: -500, opacity: 1, duration: 500 }}
  >
    <h1 class="title" in:fly={animation}>Login</h1>
    <form class="login-form" on:submit={handleSubmit}>
      <input
        required
        type='username'
        name='username'
        placeholder='Username'
        bind:value={$form.username}
        in:fly={{ ...animation, delay: animation.delay + 50 }}
      />
      <input
        required
        type='password'
        name='password'
        placeholder='Password'
        bind:value={$form.password}
        in:fly={{ ...animation, delay: animation.delay + 100 }}
      />
      <button
        class="submit-button"
        type='submit'
        in:fly={{ ...animation, delay: animation.delay + 150 }}
      >
        {#if isLoading}
          <Diamonds size="60" color="hsl(359, 88%, 55%)" unit="px" duration="4s" />
        {:else}
          Sign In
        {/if}
      </button>
      <div class="social-login">
        {#each loginProviders as loginProvider}
          <LoginWithProvider
            {...loginProvider}
            onSuccess={onLoginWithProvider}
          />
        {/each}
      </div>
      {#if errorMessage}
        {#if errorMessage.includes('account associated')}
          <p class="error-message" transition:fade='{{ duration: animation.duration - 250 }}'>
            {errorMessage.slice(10, -1)} <br>
            Please try again or <button class="contact-button" on:click={() => showContactDialog.update(() => true)}>contact us</button>.
          </p>
        {:else}
          <p class="error-message" transition:fade='{{ duration: animation.duration - 250 }}'>
            Sorry, the username and password you entered did not match our records. <br>
            Please try again or <button class="contact-button" on:click={() => showContactDialog.update(() => true)}>contact us</button>.
          </p>
        {/if}
      {/if}
    </form>
  </div>
</div>

<style lang='scss'>
  .outer-container {
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.6);
    display: grid;
    place-items: center;
  }
  .inner-container {
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: hsla(0, 0%, 100%, 0.6);
    border-radius: 1em;
    gap: 1em;
    text-align: center;
  }
  .title {
    font-size: 2rem;
    margin-top: 1em;
    margin-bottom: 0.5em;
    color: hsl(261, 64%, 18%);
  }
  .error-message{
    padding: 1em;
    background: hsla(0, 100%, 50%, 0.5);
    border-radius: 0.8em;
  }
  .contact-button {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 12em;
    height: 2.5em;
    margin-bottom: 1em;
    padding: 0 1em;
    background: transparent;
    outline: none;
    box-shadow: 0 0 0 1px hsla(261, 64%, 18%, 0.3);
    border-radius: 0.5em;
    transition: box-shadow 100ms ease-in;
    &:hover:not(:focus) {
      box-shadow: 0 0 0 0.1em hsla(261, 64%, 18%, 0.3);
    }
    &:focus {
      box-shadow: 0 0 0 0.1em hsla(261, 64%, 18%, 0.4);
    }
    &::placeholder {
      color: hsla(261, 64%, 18%, 0.7);
    }
  }
  .submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    height: 2.5em;
    width: 8em;
    color: white;
    padding: 0.6em 0;
    margin-top: 1.5em;
    border-radius: 1em;
    outline: none;
    background: linear-gradient(-45deg, hsl(284, 35%, 20%), hsl(359, 88%, 55%));
    background-size: 150% 150%;
    animation: gradient 5s ease infinite;
    &:hover, &:focus {
      background: linear-gradient(-45deg, hsl(284, 35%, 18%), hsl(359, 88%, 52%));
    }
    &:active {
      background: linear-gradient(-45deg, hsl(284, 35%, 15%), hsl(359, 88%, 50%));
    }
  }
  .social-login {
    display: flex;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>