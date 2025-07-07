const express = require("express");
const { authorized } = require("../middleware/auth");
const favoriteRecipeValidation = require("../utils/favoriteRecipeValidation");
const FavoriteRecipe = require("../models/favoriteRecipe");

const router = express.Router();

router.post("/user/cart/add", authorized, async (req, res) => {
  try {
    favoriteRecipeValidation(req);

    const { strMeal, strMealThumb, idMeal } = req.body;
    const loggedInUser = res.user;

    const existRecipe = await FavoriteRecipe.findOne({
      id,
      userId: loggedInUser._id,
    });

    if (existRecipe) {
      res.status(401).send({ message: "Recipe is already exist on the list" });
    }

    const data = await FavoriteRecipe({
      idMeal,
      strMeal,
      strMealThumb,
      userId: loggedInUser._id,
    });

    await data.save();

    res.send(data);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

module.exports = router;
