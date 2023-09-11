<p align="center"> 
    <img src="https://regov-store.s3.ap-southeast-1.amazonaws.com/REGOV+Logo_CMYK.png" width="200" >
</p>

# { "Software Engineer" : (React Native) }

Hey! We are excited that you are interested in joining the team at Regov Technologies.

We feel that the best place to get to know you is by showing us your skills., This test should not take you a long amount of time to complete.

## Coding Challenge ()

Design and build a frontend mobile application that can retrieve movie records; its details, ratings, and user's watchlist using the provided REST APIs. The user interface should be adhering to UI/UX design approach, principles, and best practices. We want to have a good user experience and design rather than excessive design without forgetting and sacrificing the frontend technical standards.

### Requirements

- Login

  - Using username and password (created in www.themoviedb.org)

- Dashboard

  - Listing of Trending Movies
  - Search mechanism for movies

- Movie Details & Ratings Page
  - Show Movie Details
  - Show Movie Reviews
  - Show Rating
  - Post Rating
  - Delete Rating
  - Add to Watchlist
- Watchlist

  - Listing of movies in your watchlist

- Profile
  - User Profile
  - Logout

### Notes and Recommendations

- Must use React Native with TypeScript
- Must use either Context or Redux for global state management
- Demonstrate your skills and understanding of React Hooks
- The project structure is up to your decision
- You are recommended to use git commits in a logical manner to demonstrate the development progress
- Writing tests and adhering to development standards/conventions will attract extra points.
- Feel free to go above and beyond if you have ideas for extra features!

### The HandOver

- Send your implementation in Git Repo.

### The Review

Please include a README file with a quick description of your solution.

### Submission

- Email your work to careers@regovtech.com & techchallenge@regovtech.com


### Prerequisites

**Node ^= v16.13.0**

**Android Studio / XCode (Virtual Device Simulation)**

**VS Code (IDE)**

### Cloning the repository

```shell
git clone https://github.com/itsgvsrinivas/pop-quiz-reactnative-snr.git
```

## Running Project

To run your project, connect your physical device via usb and turn on USB Debugging or start Android Virtual Device, then navigate to the root directory and run one of the following npm commands:

```shell
npm i 
npm run android
npm run ios
npm start -- --reset-cache
```

To Build APK File, Run:

```shell
npm run android -- --mode="release"
or
cd android
./gradlew assembleRelease
```

Android Build APK can be found at: `https://install.appcenter.ms/users/itsgvsrinivas/apps/tmdbapp/distribution_groups/regov`

### Funcionalities:

- Login using username and password (created in www.themoviedb.org)
- Tab bar with Homee, WatchList and Profile tabs
- Tap on Movie card to goto Details screen.
- Navigate back by cliking on Back Button on Header.
- Search with movie name to navigate to Search screen with results.
- On the search screen - Tap on Movie card to goto its Details screen.
- On the details screen, user can view movie details, mark the movie to favourites and add to watchlist
- Profile scree showing the avatar and features to go through movies of My favourite and My ratings

### Coding

- Used React Navigation and Tab navigation 
- Redux Toolkit for user state management
- Added utility and constant files for strings, url, assets, util functions and custom fonts
- Axios library for asynchronous HTTP requests.
- Added basic validations and check for network connection