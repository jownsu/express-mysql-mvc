## Folder Structure
* *./models* directory for all models.
* *./controllers* directory for all controllers.
* *./assets* directory for asset files like css js or images.
* *./system* directory is important files. Don't delete that.
* *./config* directory is the configs of database, session, port etc.
* *./routes* direcrory for all routes to be organized.
* *./views* directory for all views.
* *./partials/views* for partrial views.

## Features
* Query Builder
* Profiler
* Form Validation

## Instruction to run
* Download the file
* Run NPM Install.
* Create your database for testing.
* Setup your config in database in ./config/database.
* Run nodemon app in directory to run, and open localhost:8000 or what port you setup in config.

## Profiler
* To use profiler. In *./config/config.js* set the config.profilerEnabled to true.
* Use View Class in Controllers. example: *View.render(res, 'profile', { user: response.data[0] }, req, response);*.