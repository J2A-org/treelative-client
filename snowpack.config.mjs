export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  alias: {
    '@app': './src'
  },
  plugins: [
    '@snowpack/plugin-svelte',
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
