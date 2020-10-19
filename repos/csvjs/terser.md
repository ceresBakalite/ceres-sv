#### Command line usage

Note: Update the corresponding import reference in ceres-sv.js to point to the minified ceres-sv-lib.min.js

**Example 1**

*Simple file pass*

    terser -c -m -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js
    terser -c -m -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv-lib.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js

**Example 2**

*Reserve specific words*

    terser -c -m reserved=['getImage','getSlide'] -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js
    terser -c -m  -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv-lib.min.js -- C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js

**Example 3**

*Combine two files into one*

    terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv.min.js -c -m

Note: Remove the corresponding import reference in ceres-sv.js

**Example 4**

*Combine two files into one*

    terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv.min.js -c -m

    terser C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\ceres-sv-lib.js -o C:\Users\Sandy\Documents\GitHub\ceres-sv\repos\csvjs\mod\ceres-sv-lib.min.js -c -m
