var Clippy = require('./library/clippy.js')
var clippy = new Clippy
var moment = require('moment')

clippy.decode('./audio/theodore-hello-1.wav').then(function(info){
	var samples = info.channelData
	var conversations = clippy.findConversations(samples)
	conversations.forEach(function(conversation,index,array){
		var time = moment().format('YYYYMMDD')
		var destination = './outputs/output-' + index + '-' + time + '.wav'
		debugger
		clippy.encode(destination,{
			sampleRate: info.sampleRate,
			channelData: conversation
		}).then(function(file){
			debugger
		})
	})
})