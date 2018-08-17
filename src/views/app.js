/*
 *Apps Name: Payment Gateway App 
 *Author: Nick, Yip Tim Yan
 *Node: JS Version: 8.11.2
 *Npm: Version: 6.0.1
 */
(function () {
	'use strict';
}());
/*******************************************************************************************************************
 ************************************* Module Require & External Js & Variable **************************************
 *******************************************************************************************************************/
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let path = require('path')
let redis = require('redis')
let redisClient = redis.createClient()
let route = require('./routes/route')
let index = require('./routes/index')
/*******************************************************************************************************************
 **************************************************** Main *********************************************************
 *******************************************************************************************************************/
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('*', index)
app.use('/payment', route)

redisClient.on('connect', function () {
	console.log('Redis client connected')
})

redisClient.on('error', function (err) {
	console.log('Something went wrong ' + err)
})
module.exports = app
