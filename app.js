const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundController = require('./controllers/404');

// MongoDB
const mongoClient = require('./util/database');

const app = express();

// Global configs.
app.set('view engine', 'ejs');
app.set('views', 'views');

// Start middleware.
app.use(bodyParser.urlencoded({
    extended: false
}));

// Exposes public directory as static files root dir.
app.use(express.static(path.join(__dirname, 'public')));

// The `/admin` routes.
app.use('/admin', adminRoutes);

// The `/` routes.
app.use(shopRoutes, adminRoutes);

// Handles 404.
app.use(pageNotFoundController.get404);

mongoClient.mongoConnect(client => {
    app.listen(3002);
});
