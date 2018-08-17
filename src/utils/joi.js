(function () {
	'use strict';
}());
let Joi = require('joi')

let makePaymentScheme = Joi.object().keys({
	cn: Joi.string().regex(/[a-zA-Z]$/).required(),
	cpn: Joi.string().regex(/[0-9+-]$/).required(),
	curr: Joi.string().regex(/[A-Z]$/).required(),
	price: Joi.number().required(),
	cchn: Joi.string().regex(/[a-zA-Z]$/).required(),
	ccn: Joi.number().integer().required(),
	cce: Joi.string().required(),
	ccv: Joi.number().integer().required()
})
// By default the module shortid only allow a-z,A-Z,0-9 and -,_
let checkFromScheme = Joi.object().keys({
	pc_cn: Joi.string().regex(/[a-zA-Z]$/).required(),
	pc_prc: Joi.string().regex(/[a-zA-Z0-9_-]$/).required()
})
/* Function */
var JoiValidation = async (flag, val) => {
	var scheme = makePaymentScheme
	if (flag === 2) {
		scheme = checkFromScheme
	}
	return await new Promise((resolve, reject) => {
		try {
			Joi.validate(val, scheme, function (err, value) {
				if (err === null) {
					return resolve('success')
				} else {
					return resolve(err.details[0]['message'])
				}
			})
		} catch (e) {
			return reject(e)
		}
	})
}
module.exports.JoiValidation = JoiValidation
