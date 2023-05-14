const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  password: {
    type: String,
  }
});

const authModel = mongoose.model("user", UserSchema);
module.exports = authModel
// module.export = authModel = mongoose.model("user", UserSchema);;
