var Clippy = require('./library/clippy.js')
var clippy = new Clippy

var filename = './audio/hello.wav'

clippy.decode(filename).then(function(info){
	var ranges = info.channelData.map(function(channel){
		return clippy.getAmplitudeRange(channel)
	})
	console.log(ranges)
})