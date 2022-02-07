const mongoose = require('mongoose')

const POstSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  nameby: String,
  createTime: {
    type: Date,
    default: new Date()
  },
  image: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }

})

const Post = mongoose.model("Post", POstSchema);

module.exports = Post;