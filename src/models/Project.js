const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    unique: true,
    required: true,
  },

  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Project", projectSchema);