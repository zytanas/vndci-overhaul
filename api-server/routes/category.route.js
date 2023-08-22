const express = require("express");
const categoryController = require("../middlewares/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

//Routes
router.get("/", authMiddleware.userCheck, categoryController.getAllCategories);
router.get("/category",
    authMiddleware.userCheck,
    categoryController.getAllCategories
);

module.exports = router;