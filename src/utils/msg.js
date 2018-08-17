(function () {
	'use strict';
}());
var replyMessage = (code) => {
	var msg
	switch (code) {
		case -3:
			msg = 'Data Obtained.'
			break
		case -2:
			msg = 'Data Reset.'
			break
		case -1:
			msg = 'All Input Data Are Same. Nothing change.'
			break
		case 0:
			msg = 'Update Successfully!'
			break
		case 1:
			msg = 'Wrong Card Number.'
			break
		case 2:
			msg = 'Wrong Card Verification Code.'
			break
		case 3:
			msg = 'System Error, Please Contact Admin.'
			break
		case 4:
			msg = 'User Input An New Data, And Trigger The Update.'
			break
		case 5:
			msg = 'Invalid Input, Please Try again.'
			break
		case 6:
			msg = 'Wrong Reference Code / Wrong Name.'
			break
		case 7:
			msg = 'User Input violate the system required pattern.'
			break
		default:
			msg = 'Problems Occurance!'
			break
	}
	return msg
}
module.exports.replyMessage = replyMessage
