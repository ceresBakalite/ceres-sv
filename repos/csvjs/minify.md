#### Command line usage

### terser CLI

https://github.com/terser/terser

**Example 1**

*recommended usage*

        1. terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -c -m reserved=['getImage','getSlide','rsc'] -f quote_style=1 --module

        2. terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-rsc.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-rsc.min.js -c -m reserved=['getImage','getSlide','rsc'] -f quote_style=1 --module

**Example 2**

*with source map*

        1. terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -c -m reserved=['getImage','getSlide'] -f quote_style=1 --module --source-map "root='C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs',url='https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.js.map'"

        2. terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-rsc.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-rsc.min.js -c -m reserved=['getImage','getSlide','rsc'] -f quote_style=1 --module --source-map "root='C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs',url='https://ceresbakalite.github.io/ceres-sv/prod/ceres-rsc.min.js.map'"

**Example 3**

*alternatively...*

        1. terser -c -m -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js

**Example 4**

*combine two files into one*

        1. terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -c -m

- [x] <sup>Remove any corresponding import references in ceres-sv.js</sup>

**Example 5**

*reserve specific words*

        1. terser -c -m reserved=['getImage','getSlide'] -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js

<br>

***

### clean-css CLI

https://github.com/jakubpawlowicz/clean-css-cli

**Example 1**

*recommended usage*

        1. cleancss C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\stylesheets\ceres-sv.css -o C:\Users\Sandy\Documents\GitHub\ceres-sv\prod\ceres-sv.min.css

<br>

***        
