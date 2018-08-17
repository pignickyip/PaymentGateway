(function () {
	'use strict';
}());

module.exports = {
	currencyAll: ['HKD', 'USD', 'AUD', 'EUR', 'JPY', 'CNY'],
	currencyGatewayA: ['USD', 'AUD', 'EUR', 'JPY', 'CNY'],
	redisExpirationTime: 60 * 60,
	checkformDisplayID: ['thePayment_ref', 'thePayment_cn', 'thePayment_cpn', 'thePayment_curr', 'thePayment_price'],
	theCcnPaymentID: ['ccnPayment1', 'ccnPayment2', 'ccnPayment3', 'ccnPayment4'],
	formID: ['#cn_order', '#cpn_order', '#curr_order', '#price_order', '#cchn_payment', '#ccn_payment1', '#ccn_payment2', '#ccn_payment3', '#ccn_payment4', '#cce_payment_m', '#cce_payment_y', '#ccv_payment'],
	checkFormID: ['#pc_cn', '#pc_prc'],
	externalJSFile: ['/js/jquery-3.3.1.js', '/js/jquery-3.3.1.min.js', '/js/bootstrap.min.js'],
	externalCSSFile: ['/css/bootstrap.min.css', '/css/bootstrap-theme.min.css']
}
