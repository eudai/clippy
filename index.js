var Clippy = require('./library/clippy.js')
var clippy = new Clippy

clippy.decode('./audio/talking.wav').then(function(info){
	clippy.encode('./outputs/talking.wav',info).then(function(){
		console.log('done.')
	})
})