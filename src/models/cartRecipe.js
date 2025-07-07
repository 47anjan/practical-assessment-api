const mongoose = require("mongoose");

const cartRecipeSchema = new mongoose.Schema(
  {
    idMeal: {
      type: mongoose.Schema.Types.String,
    },
    strMeal: {
      type: mongoose.Schema.Types.String,
    },
    strMealThumb: {
      type: mongoose.Schema.Types.String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

cartRecipeSchema.index({ userId: 1, idMeal: 1 });

module.exports = mongoose.model("CartRecipe", cartRecipeSchema);
