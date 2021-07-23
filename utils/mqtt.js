
const mqtt_url = "mqtt://hetic.arcplex.fr";
const options = {
  port: 1883,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "HETICLIOT",
  password: "47580327",
};
const client = mqtt.connect(mqtt_url, options);

module.exports = {
  write: function(){

  },
  read: function(){
    console.log(1);

    client.on('reconnect', (error) => {
      console.log('reconnecting:', error)
    })
    
    client.on('error', (error) => {
        console.log('Connection failed:', error)
    })


    client.on('connect', function() { // When connected
      // subscribe to a topic
      console.log(2);

      client.subscribe('WEB2-HETICLIOT/587674745/121', function() {
        // when a message arrives, do something with it
        console.log(3);

        client.on('message', function(topic, message, packet) {
          console.log("Received '" + message, topic);
        });
      });
    
    });
  }
}