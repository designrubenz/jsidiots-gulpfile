# jsidiots-gulpfile
## A gulpfile.js for regular webdevelopers

### What's it all about?
If you don't consider yourself a rockstar, a ninja, or a 10X kind of person:
good news! Here is a gulpfile that simply works, is easy to understand and makes
developing a new site a breeze. It comes with some convenient conventions and
defaults to make your webdev life easier.
 
### Version 3.0
#### Reduce to the max!
* updates all dependencies to the latest versions (as of 2017-03-16).
* gets rid of more exoctic gulp taks

### How to use
* if you haven't already, install [npm](https://www.npmjs.com/).
* clone this respository to your local machine
* `npm install`
* run any of the gulp commands listed below, eg. `gulp` or `gulp prod`

### Features
* uses sass (supporting the scss-syntax), minifies and auto-prefixes your css for production.
* auto-prefixing depending on your choice of browsers you want to support, using
    caniuse-statistics
* autorefreshes browsers (autoreloads)
* concatenates, minifies and lints your js-files
* creates all the files needed for production in the build directory
* minifies images (jpg, png, jpg, svg)
* includes various icon references for touch devices and a favicon.ico as a reminder
* uploads the production files that have been changed to your server

### folder structure

`/src`: put all your code and images here. Be careful not to put code into `src/js/main.js` (s. below).  
`/build`: will contain all the files ready for production. To automatically generate them, use `gulp prod`.

You can easily change the names of your source and build folder on the first two lines of gulpfile.js according to your own preferences.

### gulp commands
* `gulp` or `gulp serve`: starts the server (using browsersync so that you can easily test your sites on all devices available). Refreshes the browsers automatically when you edit and save your scss, js or index.html files. Use this command while working on your project.
* `gulp compress`: minifies your images and copies them to the production (build) folder
* `gulp prod`:  generates and copies all the files you need for deployment into the build folder

### JS files
All JS-files in your 'src/js' folder get concatenated into 'src/js/main.js'. JS-files in 'src/js/lib' will appear first.

### Wanna contribute?
Cool, thanks! But keep in mind: I will most likely not add tasks and features in order to keep things simple. But there is always room for improvement, so get in touch!

### Credits

The idiot's gulpfile is based on Google's [web-starter-kit](https://github.com/google/web-starter-kit) and [greypants' gulp starter](https://github.com/greypants/gulp-starter).

### What else?
Follow me on [twitter](https://twitter.com/j_rubenz)!

### Is that all?
Yep.
