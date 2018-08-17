(function () {
	'use strict';
}());
process.env.NODE_ENV = 'test'
let chai = require('chai')
let should = require('should')
let assert = require('assert')
let expect = require('chai').expect
let app = require('../app')
chai.use(require('chai-http'))

// https://ubuverse.com/introduction-to-node-js-api-unit-testing-with-mocha-and-chai/
describe('Demo Payment part of Routing', () => {
	before(function () {})
	// Called once before each of the tests in this block.
	beforeEach(function () {})
	// Called after all of the tests in this block complete.
	after(function () {})
	// Called once after each of the tests in this block.
	afterEach(function () {})
	describe('Routing', function () {
		it('Get my main page', function (done) {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					expect(err).to.not.exist
					expect(res.status).to.equal(200)
					done()
				})
		})
		describe('Default route', function () {
			it('try to Get the file', function () {
				return chai.request(app)
					.get('/getfile?file=mytestdd', (res, req, next) => {
						expect(res.statusCode).to.equal(404)
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
		})
		describe('Make the order test', function () {
			it('Normal Success', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						cn: 'Test Test',
						cpn: '+852-01010101',
						curr: 'HKD',
						price: '123',
						cchn: 'Test Test',
						ccn: '3433343323324343',
						cce: '02-19',
						ccv: '234'
					})
					.then(function (res) {
						expect(res).to.have.status(200)
					})
			})
			it('User input eror, Wrong Customer Credit Number', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						cn: 'Test Test',
						cpn: '+852-01010101',
						curr: 'HKD',
						price: '123',
						cchn: 'Test Test',
						ccn: 'fef',
						cce: '02-19',
						ccv: '234'
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
			it('Invlaid post, Missing some parameters', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						cn: 'Test Test',
						price: '123',
						cchn: 'Test Test',
						ccn: 'fef',
						cce: '02-19',
						ccv: '234'
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
		})
		describe('Checking request test', function () {
			it('Normal Success', function () {
				return chai.request(app)
					.post('/payment/check')
					.send({
						pc_cn: 'Test Test',
						pc_prc: 'mytest'
					})
					.then(function (res) {
						expect(res).to.have.status(200)
					})
			})
			it('Invlaid post, Missing some parameters', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						pc_cn: 'Test Test'
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
			it('Wrong input', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						pc_cn: 'Test Test',
						pc_prc: 'mytest.txt'
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
			it('Input somthing doesnot contain', function () {
				return chai.request(app)
					.post('/payment/make')
					.send({
						pc_cn: 'Test',
						pc_prc: 'mytest'
					})
					.then(function (res) {
						expect(res).to.have.status(404)
					})
			})
		})
	})
})
