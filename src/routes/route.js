(function () {
	'use strict';
}());
var express = require('express')
var router = express.Router()
var path = require('path')
var ctrl = require(path.join(__dirname, '/../controller/PaymentController'))

router.route('/make').post(ctrl.insertment)
router.route('/check').post(ctrl.checker)

module.exports = router
