var Clippy = require('./library/clippy.js')
var clippy = new Clippy

clippy.decode('./audio/silent.wav').then(function(info){
	var data = info.channelData[0]
	var quiet = clippy.isQuiet(data)
})