#### Command line usage

### terser

https://github.com/terser/terser

**Example 1**

*Recommended usage*

        terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -c -m
        terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv-lib.min.js -c -m

- [x] <sup>Update the corresponding import reference in ceres-sv.js to point to the minified ceres-sv-lib.min.js</sup>

**Example 2**

*Alternatively...*

        terser -c -m -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js
        terser -c -m -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv-lib.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js

**Example 3**

*Combine two files into one*

        terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -c -m

- [x] <sup>Remove the corresponding import reference in ceres-sv.js</sup>

**Example 4**

*Reserve specific words*

        terser -c -m reserved=['getImage','getSlide'] -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js
        terser -c -m  -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\prod\ceres-sv-lib.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js

<br>

***



### clean-css

https://github.com/jakubpawlowicz/clean-css-cli

**Example 1**

*Recommended usage*

        cleancss C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\stylesheets\ceres-sv.css -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.css

        cleancss --format 'breaks:afterBlockBegins=on;spaces:aroundSelectorRelation=on' one.css
        # `breaks` controls where to insert breaks
<br>

***        
