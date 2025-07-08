const recipeValidation = (req) => {
  const { name, category, ingredients, instructions } = req.body;

  if (!name) {
    throw new Error("Name cannot be empty");
  }

  if (!category) {
    throw new Error("Category cannot be empty");
  }

  if (!ingredients || ingredients.length === 0) {
    throw new Error("Ingredients cannot be empty");
  }

  if (!instructions || instructions.length === 0) {
    throw new Error("Instructions cannot be empty");
  }
};

module.exports = recipeValidation;
