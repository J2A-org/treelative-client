# Treelative

## Development
- Install dependencies by running `npm i`
- Start the development server by running `npm run start`
- Open up the app from `http://localhost:7000`

## Production
- Install dependencies by running `npm i --production`
- Build the production files by running `npm run build`
- Serve the `/dist` directory

## TODO:
- mobile context menu
 - search - move search inside context
 - Insights:
    - stats - info - total users and total family count
    - ..etc
 - view settings:
    - controls - ZOOM in out
               - reset - FIT SCREEN
    - hierarchical layout
 - paly around with vis JS clusters
- use stabilizationProgress event to show a loading GIF
- style edges differently for child-couple vs couple-partner
- investigate mobile zoom lag
- optimize canvas for mobile
- add hook to detect mobile vs desktop - set in store
- Fix death
- Add fallback avatar with initials ! - create svg paths for alphabets
- Disable dragging of nodes
- SHOW EVERYTHING INSIDE CONTEXT MENU
- HANDLE ALL ERRORS
  - Login
  - network requests