# Tic Tac Toe! 

This is "Tutorial: Intro to React". It's a simple implementation of the classic [Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game, aka 'noughts and crosses' in British English.

Did you know that noughts and crosses was one of the first playable computer games ever made? [Sandy Douglas](https://en.wikipedia.org/wiki/Sandy_Douglas) was a British CS professor who created the first graphical computer game at Cambridge in 1952, which ran on the [EDSAC](https://en.wikipedia.org/wiki/EDSAC) computer.

Tutorial URL:
[https://reactjs.org/tutorial/tutorial.html](https://reactjs.org/tutorial/tutorial.html)

The extra improvements outside the tutorial which I implemented:

- [x] Display the location for each move in the format (col, row) in the move history list.
- [x] Bold the currently selected item in the move list.
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
- [x] When someone wins, highlight the three squares that caused the win.
- [x] When no one wins, display a message about the result being a draw.

---

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
