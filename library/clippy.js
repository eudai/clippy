var fs = require('fs')
var WavDecoder = require('wav-decoder')

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

	this.getAmplitudeRange = function(data){
		return data.reduce(function(accumulator,amplitude){
			if (amplitude > accumulator.high){
				accumulator.high = amplitude
			}
			if (amplitude < accumulator.low){
				accumulator.low = amplitude
			}
			return accumulator
		},{
			low: data[0],
			high: data[0]
		})
	}

	this.categorizeAmplitude = function(data){
		var range = this.getAmplitudeRange(data)
		var diff = range.high - range.low
		debugger
	}

}

module.exports = Clippy