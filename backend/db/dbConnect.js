const mongoose = require("mongoose");
// require('dotenv').config()


async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
 // Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://parvezansari037:ahmed131037@cluster0.dyftlpb.mongodb.net/UserDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
  });
}

module.exports = dbConnect;