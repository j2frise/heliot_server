const accountSid = 'ACe8324a8d3697fcaae637be7b22ebe650'; 
const authToken = '45cfa537f990d6e3905e7158ebdea411'; 
const client = require('twilio')(accountSid, authToken); 

module.exports = {
    sendToClient: function(to, content){
        client.messages 
        .create({ 
            body: content,  
            messagingServiceSid: 'MGf695fcc1179d2348ab43a35beb771d3c',      
            to: to
        }) 
        .then(message => console.log(message.sid)) 
        .done();
    },
}