const express = require("express");
const { authorized } = require("../middleware/auth");
const recipeValidation = require("../utils/recipeValidation");
const Recipe = require("../models/recipe");

const router = express.Router();

router.post("/recipes/add", authorized, async (req, res) => {
  try {
    recipeValidation(req);

    const { name, category, ingredients, instructions, image } = req.body;
    const loggedInUser = res.user;

    const data = await Recipe({
      name,
      category,
      ingredients,
      instructions,
      image,
      userId: loggedInUser._id,
    });

    await data.save();

    res.send(data);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

router.get("/user/recipes", authorized, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    if (limit > 1000 || page > 1000) {
      (page = 1), (limit = 10);
    }

    const skip = (page - 1) * limit;

    const data = await Recipe.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
