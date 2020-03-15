'use strict';

const mongoose = require('mongoose');
const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');

const Post = require('../models/Post');
// const dbMixin = require('../mixins/db.mixin');

module.exports = {
  name: 'posts',
  version: 1,
  mixins: [DbService],
  adapter: new MongooseAdapter(process.env.MONGODB, {
    useUnifiedTopology: true,
  useNewUrlParser: true,
  }),
  model: Post,
  rest: 'posts',
  actions: {
    list: {
      async handler() {
        const posts = await Post.find();

        return posts;
      }
    },
    get: {
      params: {
        id: { type: 'string' }
      },
      async handler(ctx) {
        console.log('IDS', ctx.params.id);
        const post = await Post.findOne({ _id: mongoose.Types.ObjectId(ctx.params.id) });
        return post || { success: false };
      }
    },
    create: {
      params: {
        title: { type: 'string' },
        excerpt: { type: 'string', optional: true },
        content: { type: 'string', optional: true }
      },
      async handler(ctx) {
        this.broker.cacher.clean();
        await Post.create(ctx.params);
        return { success: true };
      }
    }
  }
};
