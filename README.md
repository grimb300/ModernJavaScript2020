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