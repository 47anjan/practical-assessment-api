const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one ingredient is required",
      },
    },
    instructions: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one instruction is required",
      },
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/10/20/17/57/pasta-5671106_1280.jpg",
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

module.exports = mongoose.model("Recipe", recipeSchema);
