# ModernJavaScript2020

Tutorial work associated with [Modern Javascript Bootcamp Course - 2020](https://www.udemy.com/course/javascript-beginners-complete-tutorial) by [Colt Steele](https://www.udemy.com/user/coltsteele/)

* coinGame/
     * Simple DOM manipulation game where a sprite (unsuccessfully) tries to catch a coin
* timer/
     * Basic countdown timer with border animation
* movieFight/
     * Use the axios library to fetch movie data from [The Open Movie Database](http://www.omdbapi.com/)
     * Create an autocomplete search widget with AJAX to facilitate reuse
     * Compare search results from two movies to see which is "better"
* maze/
     * Using matter.js, create a randomly generated maze
     * Control ball via keyboard toward goal
* secretMessage/
     * Take an input message in ASCII and convert to base64 encoded link
     * The generated link can be shared and will decode the secret message
     * Deploy to Zeit now (using 'npx now'), [my link](https://modern-js-bootcamp2020-mraa0okf2.now.sh/index.html)
* node/
     * Practice area for learning about node.js
     * Modules (module.exports and require)
     * Node CLI debugger (node inspect <filename>)
     * Node chrome debugger (--inspect-brk <filename>, then browse to chrome://inspect)
* list/
     * Node.js script that lists directories and files much like 'ls'
     * Create an executable with 'npm link'
     * Explore different methods of calling lstat settling on the "best" being the Promises.all() method of calling async functions
     * Use chalk to colorize the output
* watchit/
     * Node.js script that watches a directory and runs a specified program whenever there are changes (nodemon clone)
     * Use chokidar to monitor a directory for changes (add, change, unlink)
     * Use lodash.debounce to debounce changes in the directory, keeps it from restarting the program once for every file in the directory at startup
     * Use caporal as a framework for the CLI program
     * Use fs.access to check existence of program given on the command line or index.js if no program is given
     * Use child_process.spawn to kill (if necessary) and launch the program
     * Use chalk to make things pretty in the terminal
* ecomm/
     * Express based e-commerce website
     * Use nodemon to monitor changes and restart the server
     * Build my own "database" using JSON files for users, products, and carts
     * Build my own auth solution using libraries: cookie-session and crypto
     * Build middleware form validators with express-validator library
     * Handle image uploads with multer library
* hidash/
     * Explore testing frameworks
     * Create a clone of the lodash forEach and map functions
     * Create home-grown testing library
     * Use mocha to see how little the tests need to change
* movies.testing/
     * Copy of earlier project that will have testing added
     * Find out how much of a pain it is to setup mocha.js to work in the browser
     * Use chai.js for assertions
     * Create helper function to wait until a DOM element is visible
* tme/
     * Home spun testing framework
     * Use jsdom library to render web based tests