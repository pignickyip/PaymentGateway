/*******************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------
************************************** Payment App (Part of Database) **********************************************
--------------------------------------------------------------------------------------------------------------------
*******************************************************************************************************************/
/*
Author: Nick, Yip Tim Yan
Database version: v2.6.10
Database name: payment
Collection name: depend on user; (dynamic)
*/
/*******************************************************************************************************************
 *********************************** Payment App (Part of Database.Handler) ****************************************
 *******************************************************************************************************************/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.1.16:27017/";
var dbName = 'payment';

function create(va) {
	MongoClient.connect(va, function (err, db) {
		if (err) throw err;
		console.log("Database created!");
		db.close();
	});
}

function Insert_One(collection, data) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection(collection).insertOne(data, function (err, res) {
			if (err) {
				throw err
			};
			console.log("1 document inserted");
			db.close();
		});
	});
}

function Insert_Many(collection, data) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection(collection).insertMany(data, function (err, res) {
			if (err) {
				throw err
			};
			console.log("document inserted");
			db.close();
		});
	});
}

async function Find_All(collection) {
	return await new Promise((resolve, reject) => {
		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo.collection(collection).find({}).toArray(function (err, result) {
				if (err) {
					throw err;
					return reject('error');
				}
				db.close();
				return resolve(result);
			});
		});
	});
}

async function Drop_All(collection) {
	return await new Promise((resolve, reject) => {
		try {
			MongoClient.connect(url, {
				useNewUrlParser: true
			}, function (err, db) {
				if (err) throw err;
				var dbo = db.db(dbName);
				dbo.dropCollection(collection, function (err, delOK) {
					if (err) {
						throw err;
						return reject('error');
					}
					if (delOK) {
						console.log("Collection deleted");
					}
					db.close();
					return resolve('sucess');
				});
			});
		} catch (e) {
			throw e;
			return reject('error');
		}
	})
}

async function Create_Collection(coll) {
	return await new Promise((resolve, reject) => {
		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			dbo.createCollection(coll, function (err, res) {
				if (err) {
					throw err;
					return reject('error');
				}
				db.close();
				console.log('success');
				return resolve('sucess');
			});
		});
	});
}

function Update_Data(collection, query, newdata) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection(collection).updateOne(query, newdata, {
			multi: true
		}, function (err, res) {
			if (err) throw err;
			console.log("document updated");
			db.close();
		});
	});
}
/*******************************************************************************************************************
 ********************************************* Module Exports ******************************************************
 *******************************************************************************************************************/
module.exports.Insert_One = Insert_One;
module.exports.Insert_Many = Insert_Many;
module.exports.Find_All = Find_All;
module.exports.Drop_All = Drop_All;
module.exports.Create_Collection = Create_Collection;
module.exports.Update_Data = Update_Data;
//module.exports.create = create;
