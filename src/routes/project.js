const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/User");
const Project = require("../models/Project");

/*
 * Get all projects
 * Public
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: 1,
    });

    res.json(projects);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

/*
 * Get one project
 * Public
 */
router.get("/:projectId", async (req, res) => {
  try {

    const project = await Project.findOne({
      projectId: req.params.projectId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    res.json(project);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

/*
 * Like / Unlike project
 * Private
 */
router.post("/:projectId/like", auth, async (req, res) => {
  try {

    const { projectId } = req.params;

    const user = await User.findById(req.user._id);

    const project = await Project.findOne({
      projectId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const alreadyLiked = user.likedProjects.some(
      (p) => p.projectId === projectId
    );

    if (alreadyLiked) {

      // Unlike
      user.likedProjects = user.likedProjects.filter(
        (p) => p.projectId !== projectId
      );

      project.likes = Math.max(0, project.likes - 1);

      await user.save();
      await project.save();

      return res.json({
        liked: false,
        likes: project.likes,
      });
    }

    // Like
    user.likedProjects.push({
      projectId,
    });

    project.likes += 1;

    await user.save();
    await project.save();

    res.json({
      liked: true,
      likes: project.likes,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

/*
 * Check if current user liked project
 * Private
 */
router.get("/:projectId/status", auth, async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    const liked = user.likedProjects.some(
      (p) => p.projectId === req.params.projectId
    );

    res.json({
      liked,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;