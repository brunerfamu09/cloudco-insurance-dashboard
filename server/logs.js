import { MongoClient } from 'mongodb';
import assert from 'assert';
import cfenv from 'cfenv';
import util from 'util';

// load local VCAP configuration
var vcapLocal = null
try {
  vcapLocal = require("../vcap-local.json");
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) {
  console.log("No Local vcap-local.json file found");
}

// get the app environment from Cloud Foundry, defaulting to local VCAP
var appEnvOpts = vcapLocal ? {
  vcap: vcapLocal
} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

// Within the application environment (appenv) there's a services object
const services = appEnv.services;

// The services object is a map named by service so we extract the one for MongoDB
const mongodb_services = services['insurance-bot-db'] || services['compose-for-mongodb'];

// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");

// We now take the first bound MongoDB service and extract it's credentials object
const credentials = mongodb_services[0].credentials;

const ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

const mongoOptions = {
  mongos: {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    poolSize: 1,
    reconnectTries: 1,
  },
};

const getAllLogs = function *() {
  var db = yield MongoClient.connect(credentials.uri, mongoOptions);
  const collection = db.collection('logs');
  var docs = yield collection.find({}).toArray();
  docs.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  this.body = docs;
  db.close();
};

const deleteAllLogs = function *() {
  var db = yield MongoClient.connect(credentials.uri, mongoOptions);
  const collection = db.collection('logs');
  var r = yield collection.deleteMany({});
  this.body = "Deleted " + r.deletedCount;
  db.close();
};

const calls = {
  getAllLogs,
  deleteAllLogs
}

export default calls;
