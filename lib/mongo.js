const MongoClient = require('mongodb').MongoClient;
module.exports = (app) => {
  app.beforeStart(async function() {
    const mongo = {
      MongoClient
    };
    if (app && app.config && app.config.mongo) {
      const config = app.config.mongo;
      if (config.url && config.dbName) {
        app.mongo = mongo;
        if (app.config.mongo.server) {
          mongo.client = await MongoClient.connect(app.config.mongo.url, app.config.mongo.server);
        } else {
          mongo.client = await MongoClient.connect(app.config.mongo.url);
        }
        mongo.db = mongo.client.db(config.dbName);
      }
    }
  });
};