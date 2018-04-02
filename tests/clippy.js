var Clippy = require('../library/clippy.js')
var clippy = new Clippy

QUnit.test('Clippy can decode a wav file.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/hello.wav').then(function(info){
		var channels = info.channelData
		var firstChannel = channels[0]
		assert.ok(channels.length > 0,'The file had at least one channel.')
		assert.ok(firstChannel.length > 0,'The first channel had data.')
		done()
	}).catch(done)
})

QUnit.test('Clippy can determine the amplitude range of an audio sample.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/hello.wav').then(function(info){
		var channel = info.channelData[0]
		var range = clippy.getAmplitudeRange(channel)
		assert.ok(typeof range.low == 'number','The low range was a number.')
		assert.ok(typeof range.high == 'number','The high range was a number.')
		assert.ok(range.high > range.low,'The high range was greater than the low.')
		done()
	}).catch(done)
})

QUnit.test('Clippy can determine that a quiet file is quiet.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/silent.wav').then(function(info){
		var channel = info.channelData[0]
		var silent = clippy.isQuiet(channel)
		assert.ok(silent,'A silent file is determined to be silent.')
		done()
	}).catch(done)
})