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
			var equal = originalBuffer.length == buffer.length
			assert.ok(equal,'When I encode a decoded sample, the buffer is the same length as the original.')
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

QUnit.test('Clippy can identify an audio sample as silent.',function(assert){
	var done = assert.async()
	clippy.decode('./audio/silent.wav').then(function(info){
		var sample = info.channelData[0]
		var amplitude = clippy.determineHighestAmplitude(sample)
		var volume = clippy.determineVolumeType(amplitude)
		assert.ok(volume == 'silent','A silent recording is categorized as silent.')
		done()
	})
})

// QUnit.test('Clippy can identify an audio sample as background.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can identify an audio sample as whispering.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can identify an audio sample as talking.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can identify an audio sample as yelling.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the beginning of a word.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the end of a word.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can create a file of an isolated word.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the beginning of a sentence.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the end of a sentence.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can create a file of an isolated sentence.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the beginning of a conversation.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can find the end of a conversation.',function(assert){
// 	assert.ok(false,'')
// })

// QUnit.test('Clippy can create a file of an isolated conversation.',function(assert){
// 	assert.ok(false,'')
// })