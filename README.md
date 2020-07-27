# CORE
### Technology-Stack
* **Langs**
   * JavaScript
   * PHP
    
* **DevDependencies** 
   * Node.js
     * "npm": "^6.9.2"
     * "gulp": "^4.0.0",
     * "gulp-sass": "^4.0.1",
     * "gulp-cssbeautify": "^2.0.0",
     * "gulp-connect-php": "^1.0.3",
     * "gulp-concat": "^2.6.1",
     * "gulp-rename": "^1.4.0",
     * "gulp-autoprefixer": "^6.0.0",
     * "gulp-sourcemaps": "^2.6.5"
     * "del": "^5.1.0",
     * "gulp-eslint": "^5.0.0",
     * "browser-sync": "^2.26.7",
     * "eslint": "^6.0.1"
   
### Content
* **Services**
   * **JS**
      * [animate](development/services/js/animate)
      * [blockScreenOrientation.js](development/services/js/blockScreenOrientation.js)
      * [browserCheck.js](development/services/js/browserCheck.js)
      * [http.js](development/services/js/http.js)
      * [keyboard.js](development/services/js/keyboard.js)
      * [storage.js](development/services/js/storage.js)
      * [version.js](development/services/js/version.js)
   * **PHP**
      * [browserCheck.php](development/services/php/browserCheck.php)
      * [debugToConsole.php](development/services/php/debugToConsole.php)
      * [translations.php](development/services/php/translations.php)
      
* **Snippets
   * coming soon...

* **TaskRunner**
   * [gulpfile.js](gulpfile.js)
   * [gulpconfig.js](gulpconfig.js)

* **.dotfiles**
   * [.gitignore](.gitignore)
   * [.editorconfig](.editorconfig)
   * [.eslintrc](.eslintrc)
   * [.eslintignore](.eslintignore)
   * [.gitlab-cy.yml](.gitlab-cy.yml)
   * [.git-ftp-ignore](.git-ftp-ignore)
    
* **Libraries**
   * normalize.css (https://necolas.github.io/normalize.css/)
   * jquery 3.4.1 (https://jquery.com/)

### Install Dependencies
* Navigate to project root in order to install dependencies
``` 
    cd [projekt_root]
```
* install dependencies specified in the package.json with npm:
```
    npm install
```
**NOTICE:** *If there are no errors but warnings, all necessary dependencies should be installed correctly.
Now you should be able to execute GULP-tasks defined in gulpfile.js.*
