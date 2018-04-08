var fs = require('fs')
var WavDecoder = require('wav-decoder')
var WavEncoder = require('wav-encoder')
var settings = require('../config/settings.json')

var Clippy = function(){

	var decode = function(filename){
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

	var encode = function(filename,info){
		return new Promise(function(resolve,reject){
			WavEncoder.encode(info).then(function(buffer){
				var file = fs.writeFileSync(filename,new Buffer(buffer))
				resolve(file)
			}).catch(function(error){
				reject(error)
			})
		})
	}

	var findMagnitude = function(sample){
		var highestDecible = sample.reduce(function(accumulator,amplitude){
			if (amplitude > accumulator) 
				accumulator = amplitude
			return accumulator
		},0)
		var magnitude = highestDecible * 2
		return magnitude
	}

	var isSilent = function(magnitude){
		return magnitude < settings.tolerance
	}

	var findConversations = function(samples){
		var conversations = []
		var silentStreak = 0
		var conversationIndex = 0
		var state = {
			recording: false,
			silentStreak: 0,
			conversationIndex: -1
		}
		for (var i in samples){
			var sample = samples[i]
			var silent = isSilent(sample)
			if (silent){
				state.silentStreak ++
				if (state.silentStreak > settings.tolerance){
					state.recording = false
				}
			} else {
				state.silentStreak = 0
				if (!state.recording){
					state.conversationIndex ++	
					state.recording = true
				}
			}
			if (state.recording){
				conversations.push([])
				var index = state.conversationIndex
				console.log('index:',index)
				var conversation = conversations[index]
				conversation.push(sample)
			}
		}
		return conversations
	}

	this.encode = encode
	this.decode = decode
	this.findMagnitude = findMagnitude
	this.isSilent = isSilent
	this.findConversations = findConversations



}

module.exports = Clippy