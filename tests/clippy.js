var Clippy = require('../library/clippy.js')
var clippy = new Clippy

QUnit.test('Clippy can decode a wav file.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/hello.wav').then(function(info){
		assert.ok(info.channelData.length > 0,'The file had data.')
		done()
	})
})

QUnit.test('Clippy can get the amplitude range of a wav file.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/hello.wav').then(function(info){
		var data = info.channelData
		var range = clippy.getAmplitudeRange(data)
		assert.ok(range.high > range.low,'The high range was greater than the low.')
		done()
	})
})