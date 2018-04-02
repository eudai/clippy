var Clippy = require('./library/clippy.js')
var clippy = new Clippy

clippy.decode('./audio/yelling.wav').then(function(info){
	var samples = info.channelData
	for (var i in samples){
		var sample = samples[i]
		var magnitude = clippy.findMagnitude(sample)
		var silent = clippy.isSilent(magnitude)
	}
})