"use strict";

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');

module.exports = function() {
  return {
    mixins: [DbService],
    adapter: new MongooseAdapter(process.env.MONGODB)
  };
};
