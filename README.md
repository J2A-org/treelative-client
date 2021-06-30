# Treelative

## Development
- Install dependencies by running `npm i`
- Start the development server by running `npm run dev`
- Open up the app from `http://localhost:7000`

## Production
- Install dependencies by running `npm i --production`
- Build the production files by running `npm run build`
- Serve the `/dist` directory

<!-- ## TODO:
ARUN - If logged in, but not authorized - show contact Admins UI // First need to implement firebase
ARUN - BUTTON - cursor, on hover: focus -
 - handle firebase no account error !
ARUN - Mount profile card on demand
JANA - add hook to detect mobile vs desktop - set in store
JANA - optimize canvas for mobile
  - Login
  - network requests-
- Add reusable IMAGE component with fallback support
JANA - Add firebase integration
JANA - play around with vis JS clusters
JANA - Detect pixel density
JANA - No auth need to view admin profile cards
JANA - Add remove avatar in Admin UI
JANA - get node position of logged in user
JANA - investigate parents stay separated from children
ARUN- Optimize all images before launch

 -->

# TODO - NEXT
- REMOVE ADMIN UI
- SLIDE SHOW COMPONENT
- MODAL COMPONENT
- JANA: DATE PICKER COMPONENT
- JANA: LOCATION PICKER COMPONENT
- JANA: FIREBASE AUTH
- MENU
 - top sticky search - right addon new user
 - total users / families (optional) count
 - layout settings for graph
   - network
   - hierarchical
   - google maps
   - generation view
  - insights - button - open modal
 - credits to us
- PROFILE CARD
  - gallery - card
  - partner separate
  - have edit mode
  - each field is gonna be editable - each on its own modal
  - MAPS - embed url should come from home API
  - NEW Section for managing auth stuff - username edit, password reset ??
  - Micham ellam okay to map one-to-one from admin ui - except relations
  - For now - only auth user / admin can edit / or family members /
- RELATIONS EDIT
 - based on canvas interaction
   - click on card - click on on either add parent/partner.child - > new search modal will appear and filter on canvas
- ADD NEW USER
 - anyone can add a family member - admin all is welcomes u
