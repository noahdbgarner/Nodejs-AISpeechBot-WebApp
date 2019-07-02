//instantly executed since not set to a const/val variable, we can even do
//it like this on the database side, but this makes more sense...
require('dotenv').config();
//now we can access these variables through the process.env object! Cool
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const PORT = process.env.PORT;
//create express app
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
//for our stylesheets to be seen and placed by the server, can be done with views too
app.use(express.static('./public/'));
//so we can deal with body of request object
app.use(bodyParser.urlencoded({extended: false}));
//set up  routes
app.use('/', homeRouter.routes);
//set up our server with a welcome message in console, notice double bar :)
const server = app.listen(PORT || 5000, () => {
    console.log(`Server start on port ${PORT}`);
});

//begin socket program code
const io = require('socket.io').listen(server);
io.on('connection', function(socket){
    console.log('a user connected');
});
//instantiate our Socket.IO with my client token from .env file
const apiai = require('apiai')(APIAI_TOKEN);
//begin listening for chat message from client
io.on('connection', function(socket) {
    //listen to the event
    socket.on('chat message', (text) => {
        // Get a reply from API.AI
        let apiaiReq = apiai.textRequest(text, {
            //object
            sessionId: APIAI_SESSION_ID
        });
        //works so do this one
        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            //basically the same as sending a response object
            socket.emit('bot reply', aiText); // Send the result back to the browser!
        });
        //send an error message
        apiaiReq.on('error', (error) => {
            console.log(error);
        });
        apiaiReq.end();
    });
});


