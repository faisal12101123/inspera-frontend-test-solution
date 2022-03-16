Inspera test instructions
====================================

## Setup

* `yarn install`

* `yarn start`

* open in browser: `http://localhost:8080/`

* run tests: `yarn test`

## Tasks

### 1 Change the header and add "Dark mode"
Look at the video added in the docs folder (_docs/responsive-header-with-dark-mode.mov_). Change the CSS and/or HTML 
of the Header component to make it responsive and have a dark mode, similarly to what is shown in the screen recording. 

### 2 Update the timer
The user interface now gets updated with the time every 10 seconds. The time is requested from a
server as the user can get extra time and also needs to be synchronized with the server time. 
Change the user interface logic so that the timer displayed to the user counts every second, while still
requesting/synchronizing with the server every 10 seconds. Calling the api every second should _not be done_
as this will increase the load on the server.
Write some unit tests for this change.
