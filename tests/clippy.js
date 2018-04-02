var Clippy = require('../library/clippy.js')
var clippy = new Clippy

QUnit.test('Clippy can decode a wav file.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/hello.wav').then(function(info){
		assert.ok(info.channelData.length > 0,'The file had data.')
		done()
	})
})