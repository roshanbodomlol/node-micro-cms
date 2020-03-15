'use strict';

const ApiGateway = require('moleculer-web');
const Err = ApiGateway.Errors;

module.exports = {
  name: 'api',
  mixins: [
    ApiGateway
  ],
  settings: {
    port: process.env.PORT || 3000,
    routes: [
      {
        path: '/api',
        whitelist: [
          'v1.posts.**'
        ],
        mappingPolicy: 'all',
        bodyParsers: {
          json: { limit: "1MB" },
          urlencoded: { extended: true, limit: "1MB" }
        },
        aliases: {
          'GET posts': 'posts.list',
          'GET posts/:id': 'posts.get',
          'POST posts': 'posts.create',
          // 'PUT posts': 'posts.update',
          // 'DELETE posts': 'posts.remove'
        },
        autoAliases: true
      }
    ]
  }
};
