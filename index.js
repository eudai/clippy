var Clippy = require('./library/clippy.js')
var clippy = new Clippy

clippy.decode('./audio/yelling.wav').then(function(info){
	var sample = info.channelData[0]
	var amplitude = clippy.determineHighestAmplitude(sample)
	var volume = clippy.determineVolumeType(amplitude)
	console.log({
		amplitude: amplitude,
		volume: volume
	})
})