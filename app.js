const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const bodyParser = require('body-parser');
//handlebars view engine set up
app.engine('hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views','./views');
//for our stylesheets to be seen and placed by the server
app.use(express.static('./public/'));
//so we can deal with body of request object
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', homeRouter.routes);
app.listen(4002);
