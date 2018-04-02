var fs = require('fs')
var Clippy = require('../library/clippy.js')
var clippy = new Clippy

QUnit.test('Clippy can decode a wav file.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/talking.wav').then(function(info){
		var samples = info.channelData
		assert.ok(samples[0].length > 0,'The first sample had data.')
		done()
	})
})

QUnit.test('Clippy can encode a wav file.',function(assert){
	var done = assert.async()
	var originalBuffer = fs.readFileSync('./audio/talking.wav')
	clippy.decode('./audio/talking.wav').then(function(info){
		clippy.encode('./outputs/talking.wav',info).then(function(){
			var buffer = fs.readFileSync('./outputs/talking.wav')
			assert.equal(buffer.length,originalBuffer.length,'When I encode a decoded sample, the buffer is the same length as the original.')
			done()
		})
	})
})

QUnit.test('Clippy can determine the highest amplitude of an audio sample.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/talking.wav').then(function(info){
		var sample = info.channelData[0]
		var amplitude = clippy.determineHighestAmplitude(sample)
		assert.ok(amplitude > 0,'The highest amplitude was greater than zero.')
		done()
	}).catch(done)
})

QUnit.test('Clippy can recognize silence.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/silent.wav').then(function(info){
		var sample = info.channelData[0]
		var amplitude = clippy.determineHighestAmplitude(sample)
		var volume = clippy.determineVolumeType(amplitude)
		assert.equal(volume,'silence','A quiet sample is identified as silence.')
		done()
	})
})

QUnit.test('Clippy can recognize noise.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/talking.wav').then(function(info){
		var sample = info.channelData[0]
		var amplitude = clippy.determineHighestAmplitude(sample)
		var volume = clippy.determineVolumeType(amplitude)
		assert.equal(volume,'noise','A loud recording is identified as noise.')
		done()
	})
})