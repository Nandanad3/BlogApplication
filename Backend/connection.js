const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://nandanadinesha:nandanamongo123@cluster0.zs83p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 50000 }) 
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

module.exports = mongoose;
