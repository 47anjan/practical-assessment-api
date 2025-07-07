const cartRecipeValidation = (req) => {
  const { strMeal, strMealThumb, idMeal } = req.body;

  if (!strMeal) {
    throw new Error("Title cant be empty");
  }
  if (!idMeal) {
    throw new Error("Id cant be empty");
  }
  if (!strMealThumb) {
    throw new Error("Image cant be empty");
  }
};

module.exports = cartRecipeValidation;
