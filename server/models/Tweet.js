const express = require('express');
const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tweetText:{
        type:String,
        required:true,
      },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      createdAt: { type: Date, default: Date.now },
  });
  // Create a Tweet model
  const Tweet = mongoose.model('Tweet', tweetSchema);
  module.exports = Tweet;
