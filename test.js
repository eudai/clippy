var testRunner = require('node-qunit')

testRunner.run([{
	code: './library/clippy.js',
	tests: './tests/clippy.js'
}],function(error){
	if (error) throw error
})