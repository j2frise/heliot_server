//imports
var express = require('express');
var bodyParser = require('body-parser');
const mqtt = require("mqtt");
var apiRouter = require('./router/apiRouter').router;
var simpleRouter = require('./router/simpleRouter').router;
var facadeRouter = require('./router/facadeRouter').router;

var jwtUtils = require('./utils/jwt.utils');
var html = require('./send/html');
const cookieSession = require("cookie-session");

require("./auth/passportGoogleSSO");
require("./auth/passport");

const passport = require("passport");

//const PORT = process.env.PORT || 8080
const PORT = process.env.PORT || 5000

var models = require('./models');
var asyncLib = require('async');
const { Op } = require("sequelize");

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

var verifAccessFacade =  function(req, res, next){
    var headerAuth  = req.headers['authorization'];
    var user = jwtUtils.facade(headerAuth);

    if(!user){
        return res.status(503).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }
    next();
}

var insertDatas = function(dispositifId, data){
    if(parseInt(dispositifId)){
        asyncLib.waterfall([
            function(done) {
              //verify hostel exist
              models.Dispositifs_datas.findOne({
                where: { dispositifId }
              })
              .then(function(found) {
                done(null, found);
              })
              .catch(function(err) {
                console.log(err);
              });
            },
            function(found, done) {
                if(found){
                    found.update({data})
                    .then(function() {
                      console.log("update");
                      done(found);
                    }).catch(function(err) {
                      console.log(err);
                    });
                } else {
                    models.Dispositifs_datas.create({dispositifId, data})
                    .then(function() {
                      console.log("insert");
                      done(found);
                    }).catch(function(err) {
                      console.log(err);
                    });
                }
            }
          ], function(newValue) {
              //console.log(newValue);
        });
    }
}

server.use('/', simpleRouter);
server.use('/api', apiRouter);
//server.use('/api', [verifAccessAPI, apiRouter]);
server.use('/facade', [verifAccessFacade,facadeRouter]);


//Launch server
server.listen(PORT, async function(){
    const topics = []
    const dispositifsId = []

    const dispositifs = await models.Dispositifs.findAll({
        attributes: ['id', 'name'],
        include:[
            {
                model: models.Entities,
                attributes: ['id', 'nodeId']
            }
        ],
        where: { statId: {[Op.ne]:2} }
    });
    for (const res of dispositifs) {
        topics.push( `WEB2-HETICLIOT/${res["dataValues"]["Entity"]["dataValues"]["nodeId"]}/${res["dataValues"]["name"]}`)
        dispositifsId.push(res["dataValues"]["id"])
    }    

    console.log(topics);   


    const mqtt_url = "mqtt://hetic.arcplex.fr";
    const options = {
      port: 1883,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      username: "HETICLIOT",
      password: "47580327",
    };
    const client = mqtt.connect(mqtt_url, options);

    client.on('connect', function(e) { // When connected
      // subscribe to a topic   
      client.subscribe(topics, function(err, granted) {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
          var stringBuf = packet.payload.toString('utf-8');
          var obj = JSON.parse(stringBuf);
          insertDatas(obj.data.id, obj.data.value)
        });
      });
    
    });
    
    console.log("serveur HELIoT en marche? COOL :)");
});
