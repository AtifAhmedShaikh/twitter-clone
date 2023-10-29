const express = require("express");
const mongoose = require("mongoose");
const commentScehma = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  commentText: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
// Create a Tweet model
const Comment = mongoose.model("Comment", commentScehma);
module.exports = Comment;
