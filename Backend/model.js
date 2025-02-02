const mongoose = require("./connection");
const BlogSchema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
