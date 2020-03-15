'use strict';

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

module.exports = {
  name: 'users',
  version: 1,
  mixins: [DbService],
  adapter: new MongooseAdapter(process.env.MONGODB),
  model: User,
  rest: '/users',
  actions: {
    list: {
      async handler() {
        let response = { success: false };
        try {
          const users = await User.find();
          response = { success: true, users };
        } catch (e) {
          response = { error: e.message };
        }

        return response;
      }
    },
    create: {
      params: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'number', optional: true }
      },
      async handler(ctx) {
        const {
          name,
          email,
          password,
          role
        } = ctx.params;
        let response = { success: false };
        try {
          const encryptedPassword = await bcrypt(password, 10);
          const userData = {
            name,
            email,
            role,
            password: encryptedPassword
          };
          const user = await User.create(userData);
          response = { success: true, user };
        } catch (e) {
          response = { error: e.message };
        }

        return response;
      }
    }
  }
};
