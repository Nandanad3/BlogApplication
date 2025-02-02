const express = require("express");
const cors = require("cors");
const BlogModel = require("./model");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.json({ message: "Blog added successfully!" });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Error adding blog" });
  }
});

//Write your POST API here

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.put("/update/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content, img_url } = req.body;
    const updatedPost = await BlogModel.findByIdAndUpdate(
      postId,
      { title, content, img_url },
      { new: true } 
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Blog updated successfully!", updatedPost });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
});
app.delete("/delete/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await BlogModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
});


app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
