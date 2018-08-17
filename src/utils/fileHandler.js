(function () {
	'use strict';
}());
let _ = require('lodash')
let path = require('path')
let fs = require('fs')
var fileReader = async (file) => {
	return new Promise((resolve, reject) => {
		let mypath = path.join(__dirname, '/../views/asset/' + file)
		fs.readFile(mypath, 'utf8', function (err, data) {
			if (err) {
				console.log(err)
				return reject(JSON.parse([]))
			} else {
				return resolve(JSON.parse(data))
			}
		})
	})
}
//var recordFileWriter = async (fileName, refCode) => {
//    return new Promise((resolve, reject) => {
//        let filePath = path.join(__dirname, '/../../documents/records/', fileName + '.txt')
//        var stream = fs.createWriteStream(filePath)
//        stream.once('open', function (fd) {
//            stream.write('My reference code is ' + refCode + '\n And its time to live is 60 minutes.')
//            stream.end()
//        })
//        return resolve(fileName)
//    })
//}
var CountryCodeFileReader = async (file) => {
	let temp = await fileReader('CountryCodes.json')
	return _.sortBy(temp, [function (o) {
		return o.name
    }])
}
module.exports.fileReader = fileReader
//module.exports.recordFileWriter = recordFileWriter
module.exports.CountryCodeFileReader = CountryCodeFileReader
