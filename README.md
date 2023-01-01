# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Explenations

Performance was the main goal :)

- I've chosen tailwind instead of MUI to minimize JS computation and use CSS instead (separation of concerns)

- network error 429 was fixed with rxjs debounce, Blob-based image cache usage, and react-window 'useIsScrolling'

- to optimize re-rendering I've used react-window with 'useIsScrolling', although to make it really smooth I had to debounce 'isScrolling' value propagation with rxjs

- I've added fade-in animations for rows and avatars. This approach decrees performance significantly (by 10 to 15 frames per sec) but I believe that is beneficial in the long run. Performance is just an abstract number :). The real app performance should be measured by UX quality and end-user happiness. Animation enforces slower scrolling - this way it is harder to notice the edge cases on slower machines.

- I do not focus on design, RWD and visual aspects due to lack of time

- search filtering is case sensitive

- tested on Chrome
