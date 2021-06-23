export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    ['@snowpack/plugin-svelte', { hmrOptions: { preserveLocalState: true } }],
    '@snowpack/plugin-dotenv'
  ],
  routes: [
    /* ... */
  ],
  optimize: {
    bundle: true
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 7000
  },
  buildOptions: {
    /* ... */
  }
}
