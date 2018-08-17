(function () {
	'use strict';
}());
let _ = require('lodash')
let creditCardType = require('credit-card-type')
let CardType = require('credit-card-type').types
let shortid = require('shortid')
let path = require('path')
let db = require(path.join(__dirname, '/db.js'))
let redis = require(path.join(__dirname, '/redis.js'))
let fwr = require(path.join(__dirname, '/fileHandler.js'))
let myData = require(path.join(__dirname, '/data.js'))
/*******************************************************************************************************************
 ******************************************* External Function *****************************************************
 *******************************************************************************************************************/
var setHandler = async (data, redisClient, currency) => {
	try {
		let cardTrigger = cardType(data['ccn'], data['ccv'], data['curr'], currency)
		if (cardTrigger.checkCode > 0) {
			return {
				checkCode: cardTrigger.checkCode
			}
		}
		let processData = dataSetup(data, cardTrigger)
		// Only trust the currency data.
		let dataCheckCode = await dataChecker(processData, redisClient, shortid.generate())
		return {
			userName: _.camelCase(dataCheckCode.userName),
			checkCode: dataCheckCode.manageCode,
			referenceCode: dataCheckCode.refCode
		}
	} catch (err) {
		console.log(err)
		return {
			checkCode: 3
		}
	}
}
var getHandler = async (data, redisClient) => {
	try {
		var thecode = -3
		let key = _.startCase(data['pc_cn']) + data['pc_prc']
		let myredisData = _.pick(await redis.redisHandler(key, redisClient), ['cn', 'cpn', 'curr', 'price'])
		if (_.isEmpty(myredisData)) {
			thecode = 6
		}
		return {
			information: myredisData,
			checkCode: thecode
		}
	} catch (err) {
		console.log(err)
		return {
			checkCode: 3
		}
	}
}
/*******************************************************************************************************************
 ******************************************* Internal Function *****************************************************
 *******************************************************************************************************************/
var mongoHandler = async (data, key) => {
	let mongoResult = await db.Find_All(key)
	if (mongoResult === 'error' || mongoResult.length === 0) {
		let cCollection = await db.Create_Collection(key)
		if (cCollection === 'sucess') {
			db.Insert_One(key, data)
			return 'new_insert'
		}
	} else {
		return mongoResult
	}
}

var dataChecker = async (data, redisClient, refCode) => {
	var manageCode = 0
	let tempData = data
	_.assign(tempData, {
		refCode: refCode
	})
	while (await redis.redisHandler(data['cn'] + refCode, redisClient)) { // until reference code no user using
		refCode = shortid.generate()
	}
	redis.redisSet(tempData, tempData['cn'] + refCode, redisClient)
	// Check then insert or return data
	if (await mongoHandler(tempData, tempData['cn'] + refCode) !== 'new_insert') {
		// Suppose the reference code should not same
		manageCode = 3
	}
	return {
		userName: tempData['cn'],
		manageCode: manageCode,
		refCode: refCode
	}
}
var cardType = (cardNumber, cardId, customerCurrency, ServerAllowCurrency) => {
	let gatewayA = myData.currencyGatewayA
	// Declare Gateway B, future use
	// let gatewayB = _.difference(ServerAllowCurrency, gatewayA)

	let type = creditCardType(cardNumber).filter(function (card) {
		return card.type === CardType.MASTERCARD || card.type === CardType.VISA ||
			card.type === CardType.AMERICAN_EXPRESS ||
			card.type === CardType.DINERS_CLUB ||
			card.type === CardType.DISCOVER ||
			card.type === CardType.JCB ||
			card.type === CardType.UNIONPAY ||
			card.type === CardType.MAESTRO ||
			card.type === CardType.MIR
	})
	if (!type || type.length < 1) {
		return {
			checkCode: 1
		}
	}
	let inputCardType = type[0]['niceType']
	if (cardId.length !== type[0]['code']['size']) {
		return {
			checkCode: 2
		}
	}
	var decis
	if (inputCardType === 'American Express' || _.indexOf(gatewayA, customerCurrency) !== -1) {
		decis = 'Gateway A'
	} else {
		decis = 'Gateway B'
	}
	return {
		checkCode: 0,
		inputCardType: inputCardType,
		decis: decis
	}
}
var dataSetup = (data, cardTrigger) => {
	data['cn'] = _.startCase(data['cn'])
	let saveData = _.pick(data, ['cn', 'cpn', 'curr', 'price'])
	_.assign(saveData, {
		cardType: cardTrigger.inputCardType,
		Gateway: cardTrigger.decis
	})
	return saveData
}

/*******************************************************************************************************************
 ********************************************* Module Exports ******************************************************
 *******************************************************************************************************************/
module.exports.setHandler = setHandler
module.exports.getHandler = getHandler
