var mosca = require('mosca');
var mqtt = require('mqtt');
var ex = require('./exercise.js');

// In the following code we create a local MQTT broker to test our code with.
// This broker does everything a regular broker would do, in addition, it logs
// all behaviour to console.

var server = new mosca.Server({port: 1883});
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running, to exit use "ctrl+c"');
}

// fired whena  client is connected
server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
  // Send some dummy data once client has subscribed
  for(var i = 0; i<5; i++)
  {
    server.publish({topic:'device/loganWeather/temperature',payload:'43'});
    server.publish({topic:'device/loganWeather/pressure',payload:'1.0'});
    server.publish({topic:'device/MITWeather/temperature',payload:'48'});
    server.publish({topic:'device/MITWeather/pressure',payload:'1.01'});
    server.publish({topic:'device/muddyCharles/soundLevel',payload:'27'});
    server.publish({topic:'device/muddyCharles/lightLevel',payload:'0.5'});
    server.publish({topic:'device/muddyCharles/temperature',payload:'72'});
  }
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});

// --------------------------------------------
// Pay attention to the following
// --------------------------------------------

// Now we will use your exercise code to access this local broker
ex.ConnectToServer('mqtt://localhost');
ex.LogChannelsReceived();

// uncomment one of the following
ex.SubscribeToAllSensorData();
ex.SubscribeToTemperatureDataOnly();

// Now print which channels data was received on
// We use a timeout here to ensure data was transmitted
// and received
setTimeout(function(){
  ex.channelsReceived.forEach(function(channel){
    console.log(channel);
  });
}, 2000);

// To exit this program use "ctrl+c"
