const express = require("express");
const { authorized } = require("../middleware/auth");
const cartRecipeValidation = require("../utils/cartRecipeValidation");
const wishListRecipeValidation = require("../utils/wishListRecipeValidation");
const CartRecipe = require("../models/cartRecipe");
const WishListRecipe = require("../models/wishlistRecipe");

const router = express.Router();

router.post("/user/cart/add", authorized, async (req, res) => {
  try {
    cartRecipeValidation(req);

    const { strMeal, strMealThumb, idMeal } = req.body;
    const loggedInUser = res.user;

    const existRecipe = await CartRecipe.findOne({
      idMeal,
      userId: loggedInUser._id,
    });

    if (existRecipe) {
      res.status(401).send({ message: "Recipe is already exist on the list" });
    }

    const data = await CartRecipe({
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

router.get("/user/cart", authorized, async (req, res) => {
  try {
    const loggedInUser = res.user;

    const data = await CartRecipe.find({
      userId: loggedInUser._id,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/user/cart/remove/:cartRecipeId",
  authorized,
  async (req, res) => {
    try {
      const { cartRecipeId } = req.params;
      const loggedInUser = res.user;

      if (!cartRecipeId) {
        res.status(401).send({ message: "Recipe Id cant be empty" });
      }

      const recipe = await CartRecipe.findOne({
        idMeal: cartRecipeId,
        userId: loggedInUser._id,
      });

      if (!recipe) {
        throw new Error("Recipe does not exist!");
      }

      const data = await recipe.deleteOne();

      res.send(data);
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }
  }
);

router.post("/user/wishlist/add", authorized, async (req, res) => {
  try {
    wishListRecipeValidation(req);

    const { strMeal, strMealThumb, idMeal } = req.body;
    const loggedInUser = res.user;

    const existRecipe = await WishListRecipe.findOne({
      idMeal,
      userId: loggedInUser._id,
    });

    if (existRecipe) {
      res.status(401).send({ message: "Recipe is already exist on the list" });
    }

    const data = await WishListRecipe({
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

router.get("/user/wishlist", authorized, async (req, res) => {
  try {
    const loggedInUser = res.user;

    const data = await WishListRecipe.find({
      userId: loggedInUser._id,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/user/wishlist/remove/:wishListRecipeId",
  authorized,
  async (req, res) => {
    try {
      const { wishListRecipeId } = req.params;
      const loggedInUser = res.user;

      if (!wishListRecipeId) {
        res.status(401).send({ message: "Recipe Id cant be empty" });
      }

      const recipe = await WishListRecipe.findOne({
        idMeal: wishListRecipeId,
        userId: loggedInUser._id,
      });

      if (!recipe) {
        throw new Error("Recipe does not exist!");
      }

      const data = await recipe.deleteOne();

      res.send(data);
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }
  }
);

module.exports = router;
