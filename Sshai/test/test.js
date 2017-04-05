var should = require('chai').should();
var mosca = require('mosca');
var ex = require('../exercise.js');

var server;
beforeEach(function(done) {
    server = new mosca.Server({port: 1883});
    ex.ConnectToServer('mqtt://localhost');
    server.on('clientConnected', function(client) {
        done();
    });
});

afterEach(function() {
    server.close();
});

describe('Call SubscribeToAllSensorData', function() {
	it('Subscribed to all sensor data', function(done) {
		server.on('subscribed', function(topic, client) {
			messages = [{topic:'device/loganWeather/temperature',payload:'43'},
    		{topic:'device/loganWeather/pressure',payload:'1.0'},
    		{topic:'device/MITWeather/temperature',payload:'48'},
    		{topic:'device/MITWeather/pressure',payload:'1.01'},
    		{topic:'device/muddyCharles/soundLevel',payload:'27'},
    		{topic:'device/muddyCharles/lightLevel',payload:'0.5'},
    		{topic:'device/muddyCharles/temperature',payload:'72'}];

            ex.channelsReceived = [];

			messages.forEach(function(message){
				server.publish(message);
			});

			setTimeout(()=>{
				for(var i=0;i<messages.length;i++)
				{
					ex.channelsReceived[i].should.equal(messages[i].topic);
				}
                ex.Disconnect();
				done();
			},1000);
		});

		ex.LogChannelsReceived();
		ex.SubscribeToAllSensorData();
	});
});

describe('Call SubscribeToTemperatureDataOnly', function() {
	it('Subscribed to temperature data only', function(done) {
		server.on('subscribed', function(topic, client) {
			messages = [{topic:'device/loganWeather/temperature',payload:'43'},
    		{topic:'device/loganWeather/pressure',payload:'1.0'},
    		{topic:'device/MITWeather/temperature',payload:'48'},
    		{topic:'device/MITWeather/pressure',payload:'1.01'},
    		{topic:'device/muddyCharles/soundLevel',payload:'27'},
    		{topic:'device/muddyCharles/lightLevel',payload:'0.5'},
    		{topic:'device/muddyCharles/temperature',payload:'72'}];

			ex.channelsReceived = [];

			messages.forEach(function(message){
				server.publish(message);
			});

			setTimeout(()=>{
				ex.channelsReceived.length.should.equal(3);
                ex.Disconnect();
				done();
			},1000);
		});

		ex.LogChannelsReceived();
		ex.SubscribeToTemperatureDataOnly();
	});
});