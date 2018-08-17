(function () {
	'use strict';
}());
let path = require('path')
let redis = require("redis")
let redisClient = redis.createClient()
let func = require(path.join(__dirname, '/../utils/func.js'))
let joi = require(path.join(__dirname, '/../utils/joi.js'))
let fwr = require(path.join(__dirname, '/../utils/fileHandler.js'))
let msgHandler = require(path.join(__dirname, '/../utils/msg.js'))
let myData = require(path.join(__dirname, '/../utils/data.js'))
module.exports = {
	insertment: async function (req, res, next) {
		let deci = await joi.JoiValidation(1, req.body)
		if (deci === 'success') {
			let returnCode = await func.setHandler(req.body, redisClient, myData.currencyAll)
			if (returnCode.checkCode > 0) {
				res.status(200).send({
					msg: msgHandler.replyMessage(returnCode.checkCode),
					msgColor: 'red'
				})
			} else {
				//let recordFile = await fwr.recordFileWriter(returnCode.userName + returnCode.referenceCode, returnCode.referenceCode)
				res.status(200).send({
					msg: msgHandler.replyMessage(returnCode.checkCode),
					msgColor: 'black',
					referenceCode: returnCode.referenceCode,
					referenceCodeExpirationTime: myData.redisExpirationTime
				})
			}
			next()
		} else {
			console.log(deci)
			res.status(404).send({
				msg: msgHandler.replyMessage(5),
				msgColor: 'red'
			})
		}
	},
	checker: async function (req, res, next) {
		let deci = await joi.JoiValidation(2, req.body)
		if (deci === 'success') {
			let returnCode = await func.getHandler(req.body, redisClient)
			if (returnCode.checkCode > 0) {
				res.status(200).send({
					msg: msgHandler.replyMessage(returnCode.checkCode),
					msgColor: 'red'
				})
			} else {
				res.status(200).send({
					msg: msgHandler.replyMessage(returnCode.checkCode),
					msgColor: 'black',
					data: returnCode.information
				})
			}
		} else {
			console.log(deci)
			res.status(404).send({
				msg: msgHandler.replyMessage(5),
				msgColor: 'red'
			})
		}
	}
}
