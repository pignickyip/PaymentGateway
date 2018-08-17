(function () {
	'use strict';
}());
let path = require('path')
let myData = require(path.join(__dirname, '/data.js'))

var redisHandler = async (key, redisClient) => {
	return new Promise((resolve, reject) => {
		redisClient.hgetall(key, function (err, obj) {
			if (err) {
				return reject(err)
			}
			return resolve(obj)
		})
	})
}
var redisSet = (data, key, redisClient) => {
	redisClient.HMSET(key, data)
	redisClient.expire(key, myData.redisExpirationTime)
}
var resetAll = (redisClient, data) => {
	redisClient.flushdb(function (err, succeeded) {
		if (err) {
			throw err
		}
		console.log(succeeded) // will be true if successfull // it will reply OK
	})
	// db.Drop_All(data['cn'])
}

module.exports.redisHandler = redisHandler
module.exports.redisSet = redisSet
module.exports.resetAll = resetAll
