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
ARUN - mobile context menu
 - search - move search inside context
 - Insights:
    - stats - info - total users and total family count
    - ..etc
 - settings:
    - controls
      - ZOOM in out
      - reset - FIT SCREEN
      - hierarchical layout
JANA - play around with vis JS clusters
ARUN - use stabilizationProgress event to show a loading GIF
ARUN - style edges differently for child-couple vs couple-partner
ARUN - Slider - for N/A stuff, keep layout but add placeholders
ARUN - Break full name
JANA/ARUN - investigate mobile zoom lag
JANA - optimize canvas for mobile
JANA - add hook to detect mobile vs desktop - set in store
ARUN - Fix death
ARUN - Add fallback avatar with initials ! - create svg paths for alphabets
ARUN - Disable dragging of nodes
ARUN - SHOW EVERYTHING INSIDE CONTEXT MENU
ARUN - HANDLE ALL ERRORS
  - Login
  - network requests-
- Add reusable IMAGE component with fallback support
JANA - Add firebase integration
ARUN - Add crow for Admins
ARUN - If logged in, but not authorized - show contact Admins UI
JANA - Detect pixel density