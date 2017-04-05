var mqtt = require('mqtt');
var client = {};
var exercise = {};
exercise.channelsReceived = [];

// We have devices connected to a broker publishing
// data. Each device may publish any data in topics
// such as:
// device/loganWeather/temperature
// device/loganWeather/pressure
// device/MITWeather/temperature
// device/MITWeather/pressure
// device/muddyCharles/soundLevel
// device/muddyCharles/lightLevel
// device/muddyCharles/temperature

exercise.ConnectToServer = function(address){
    // Connect to the MQTT broker
    client = mqtt.connect(address, {port:1883});//connect to address at port 1883 (at the host's side) 

    exercise.client = client;
};

exercise.SubscribeToAllSensorData = function(){
    // Subscribe to sensor data from all devices
     client.subscribe('device/#');    
};

exercise.SubscribeToTemperatureDataOnly = function(){
    // Subscribe to sensor data from only
    // devices which report temperature
    // data
     client.subscribe('device/+/temperature');    

};

exercise.LogChannelsReceived = function(){
    // Store the channel used for any
    // incoming message in the
    // exercise.channelsReceived array

    exercise.client.on('message', function(channel,message){
        exercise.channelsReceived.push(channel); //channel is always going to be a string
        console.log(message.toString());
    })

};

exercise.Disconnect = function(){
    // Disconnect the client


client.end();
};

module.exports = exercise;
