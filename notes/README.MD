# Install Notes

I installed the Express Generator globally for all users with this command

    sudu npm install -g express-generator

I wanted to install the EJS Express generator next, with a boot strap directory structure so I did this. One level up.

    MyMac:MEANGBS$ express -e ejs MEANGBS

   create : MEANGBS
   create : MEANGBS/package.json
   create : MEANGBS/app.js
   create : MEANGBS/public
   create : MEANGBS/public/javascripts
   create : MEANGBS/routes
   create : MEANGBS/routes/index.js
   create : MEANGBS/routes/users.js
   create : MEANGBS/public/images
   create : MEANGBS/public/stylesheets
   create : MEANGBS/public/stylesheets/style.css
   create : MEANGBS/views
   create : MEANGBS/views/index.ejs
   create : MEANGBS/views/error.ejs
   create : MEANGBS/bin
   create : MEANGBS/bin/www

   install dependencies:
     $ cd MEANGBS && npm install

   run the app:
     $ DEBUG=MEANGBS ./bin/www

This set up a directory called MEANGBS with a bunch of stuff in it.