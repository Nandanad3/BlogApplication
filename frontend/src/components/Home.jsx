import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setPosts(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:3001/delete/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
      })
      .catch((err) => {
        console.log("Error deleting post", err);
      });
  };

  const handleUpdate = (postId) => {
    navigate(`/update/${postId}`); 
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.img_url}
                  alt={post.title}
                />
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {post.content.substring(0, 100)}...
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(post._id)}
                    sx={{ marginRight: "8px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate(post._id)}
                  >
                    Update
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;

