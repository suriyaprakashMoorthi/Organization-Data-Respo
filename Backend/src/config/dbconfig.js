const mongoose = require("mongoose");

const MONGODB_CNN = process.env.MONGODB;

mongoose.connect(MONGODB_CNN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});




