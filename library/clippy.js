var fs = require('fs')
var WavDecoder = require('wav-decoder')
var volumeTypes = require('../config/volume-types.json')

var Clippy = function(){

	this.decode = function(filename){
		return new Promise(function(resolve,reject){
			fs.readFile(filename,function(error,buffer){
				if (error) return reject(error.message)
				WavDecoder.decode(buffer).then(function(info){
					resolve(info)
				}).catch(function(error){
					reject(error)
				})
			})
		})
	}

	this.determineHighestAmplitude = function(sample){
		var highestDecible = sample.reduce(function(accumulator,amplitude){
			if (amplitude > accumulator) 
				accumulator = amplitude
			return accumulator
		},0)
		var highestAmplitude = highestDecible * 2
		return highestAmplitude
	}

	this.determineVolumeType = function(amplitude){
		var type = volumeTypes.find(function(category){
			return amplitude >= category.min  && amplitude <= category.max
		})
		debugger
		if (!type) type = { description: 'Unknown' }
		return type.description
	}



}

module.exports = Clippy