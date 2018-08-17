(function () {
	'use strict';
}());
var express = require('express')
var router = express.Router()
var path = require('path')
var ctrl = require(path.join(__dirname, '/../controller/IndexController'))

router.route('/').get(ctrl.index)
router.route('*').get(ctrl.default)

module.exports = router
