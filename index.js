//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./router/apiRouter').router;
var simpleRouter = require('./router/simpleRouter').router;
var jwtUtils = require('./utils/jwt.utils');
var html = require('./send/html');
const cookieSession = require("cookie-session");

require("./auth/passportGoogleSSO");
require("./auth/passport");

const passport = require("passport");

//const PORT = process.env.PORT || 8080
const PORT = process.env.PORT || 5000

var cors = require('cors');

//instantiate server
var server = express();

server.use(cors({ origin: '*'}));

server.use(express.static(__dirname + '/data'));

//Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: ["testhfhjbhbvjbchjvhxjhb"],
    })
  );

server.use(passport.initialize());
server.use(passport.session());

//configure routes
server.get('/',function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html.home())
});

var verifAccessAPI =  function(req, res, next){
    var headerAuth  = req.headers['authorization'];
    var user = jwtUtils.getUser(headerAuth);

    if(!user){
        return res.status(503).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }
    req.user = user
    next();
}

server.use('/', simpleRouter);
server.use('/api', [verifAccessAPI, apiRouter]);

//Launch server
server.listen(PORT, function(){
    console.log("serveur HELIoT en marche? COOL :)");
});
