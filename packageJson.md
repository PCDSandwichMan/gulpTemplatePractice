<!-- * Tips / Reminders -->
    - Never touch you package-lock.json file. Just leave it the way it is.
    - dist (distributable), public, build : are all commonly conventions for package names that you use for your deployable file

<!-- * Basic Gulp Setup -->
    1) initialize your file
    2) install you dependencies
    3) create your gulp file
        1) require your dependencies


<!-- * Shortcuts -->
    - Once you have your JSON file you are able to add it to any project. You can just adjust the setup info and in the command line type ' npm install ' ( ENSURE THAT YOUR PROMPT IS SELECTING THE FILE THAT CONTAINS YOUR YOUR package.json WHEN DOING THIS )and it will install everything marked in the dependencies section of you package.json file

<!-- * package.json install syntax -->
    - dev dependencies will will usually start with "gulp-"
        npm install --save-dev gulp

