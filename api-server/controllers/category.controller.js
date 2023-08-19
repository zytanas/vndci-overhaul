const CategoryModel = require("../models/Category.model");
// const { format } = require("date-fns");

// Create a new category
const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const category = await CategoryModel.create({ name });

    if (!category)
      return res.status(500).json({ success: false, message: "Server error" });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Other category-related controllers can be added similarly

module.exports = {
  addCategory,
  getAllCategories,
  // Add other category-related controller functions here
};
