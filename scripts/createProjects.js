require("dotenv").config();

const mongoose = require("mongoose");
const Project = require("../src/models/Project");


mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const projects = [
    {
      projectId: "restaurantRatings",
      likes: 0,
    },
    {
      projectId: "chatOn",
      likes: 0,
    },
    {
      projectId: "classificationOfRecycling",
      likes: 0,
    },
  ];


  await Project.insertMany(projects);

  console.log("Projects created");

  mongoose.disconnect();

})
.catch(err => {
  console.error(err);
});