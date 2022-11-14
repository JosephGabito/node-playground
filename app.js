const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
const path = require('path');
const pageNotFoundController = require('./controllers/404');

const sequelize = require('./util/database');

const app = express();

// Global configs.
app.set('view engine', 'ejs');
app.set('views', 'views');

// Start middleware.
app.use( bodyParser.urlencoded({
    extended: false
}) );

// Exposes public directory as static files root dir.
app.use(express.static( path.join( __dirname, 'public') ) );

// The `/admin` routes.
app.use( '/admin', adminRoutes );

// The `/` routes.
app.use( shopRoutes, adminRoutes );

// Handles 404.
app.use(pageNotFoundController.get404);

sequelize.sync().then( result => {
    //console.log( result )
    // Listen to port 3002.
    app.listen( 3002 );
})
.catch( error => console.log( error ))
;

