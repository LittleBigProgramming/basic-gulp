# basic-gulp

This is a basic template for use with Gulp. This has been setup with Bootstrap added to test how to use Gulp alongside a framework/dependancy. 

Currently there is nothing in the build folder this is for demonstration purposes. Once the `node_modules` have been installed using `npm install` then it is ready to use. 

This project revolves around the setup within `gulpfile.js. It defines a folder structure which will be used throughout the file in this case src and build but this can be set to another folder as long as the path is valid.

From here various tasks are then declared which can be run using the gulp-cli. These tasks will take the code from the `src` folder and the relevant subdirectory and pipe it into a mirrored directory within the dist folder. The output of these tasks is dependant on whether or not the `inDevelopment` variable returns true or false. 
Currently it is setup to be indicating a production environment to demonstrate certain features of gulp such as minification. All of these tasks for `images, html, css, js` can all be ran individually using `gulp` followed by the task name. 

These have then been bundled in a command `run-all` which allows all of the tasks to be ran one after another so they don't have to be run one by one. 

Furthermore a watcher has been created so that by simply running `gulp watch` any alterations to the watched directories pipe the changes through to the dist folder as they happen. Remember you can always stop this task with `ctrl + C` within your terminal. 

If using the gulp-file in a different project run `npm install gulp gulp-newer gulp-imagemin gulp-htmlclean gulp-concat gulp-deporder gulp-strip-debug gulp-uglify gulp-sass gulp-postcss postcss-assets autoprefixer css-mqpacker cssnano gulp-clean-css` to install all dependencies. 
