(function () {
	'use strict';
}());
let path = require('path')
let fs = require('fs');
let fwr = require(path.join(__dirname, '/../utils/fileHandler.js'))
let myData = require(path.join(__dirname, '/../utils/data.js'))

var countryCode = ''
dataCreate();
async function dataCreate() {
	countryCode = await fwr.CountryCodeFileReader('CountryCodes.json')
}
module.exports = {
	index: function (req, res, next) {
		res.status(200).render('index', {
			title: 'Payment Demo',
			message: 'Welcome!',
			currency: myData.currencyAll,
			countryCode: countryCode,
			externalJSFile: myData.externalJSFile,
			externalCSSFile: myData.externalCSSFile,
			checkformDisplayID: JSON.stringify(myData.checkformDisplayID),
			theCcnPaymentID: myData.theCcnPaymentID,
			checkFormID: JSON.stringify(myData.checkFormID),
			formID: JSON.stringify(myData.formID)
		})
	},
	default: function (req, res, next) {
		res.status(404).send('Error')
	}
}
