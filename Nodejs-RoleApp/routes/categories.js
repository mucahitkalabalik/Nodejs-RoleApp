var express = require("express");
var router = express.Router();

const Categories = require("../db/models/categories");
const Response = require("../lib/Response");
const CustomError = require("../lib/CustomError");
const Enum = require("../config/Enum");

router.get("/", async (req, res, next) => {
  try {
    let categories = await Categories.find({});
    res.json(
      Response.successResponse(
        categories,
        200,
        "Categories fetched successfully"
      )
    );
  } catch (error) {
    let errResponse = Response.errorResponse(error);

    res.status(errResponse.code).json(errResponse);
  }
});

router.post("/add", async (req, res, next) => {
  console.log("add req");

  let body = req.body;
  try {
    if (!body.name)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error",
        "Name is required"
      );

    let category = new Categories({
      name: body.name,
      created_by: req.user?._id,
    });

    await category.save();

    res.json(
      Response.successResponse(category, 200, "Category created successfully")
    );
  } catch (error) {
    let errResponse = Response.errorResponse(error);
    res.status(errResponse.code).json(errResponse);
  }
});

router.post("/update", async (req, res, next) => {
  let body = req.body;
  try {
    if (!body._id)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error",
        "_id is required"
      );

    let updates = {};

    if (body.name) updates.name = body.name;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Categories.updateOne({ _id: body._id }, updates);
    res.json(
      Response.successResponse(null, 200, "Category updated successfully")
    );
  } catch (error) {
    let errResponse = Response.errorResponse(error);
    res.status(errResponse.code).json(errResponse);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
    console.log("delete req",req);
    let id = req.params.id;
    try {
      if (!id)
        throw new CustomError(
          Enum.HTTP_CODES.BAD_REQUEST,
          "Validation Error",
          "_id is required"
        );

      await Categories.deleteOne({ _id: id });
      res.json(
        Response.successResponse(null, 200, "Category deleted successfully")
      );
    } catch (error) {
      let errResponse = Response.errorResponse(error);
      res.status(errResponse.code).json(errResponse);
    }
})

module.exports = router;
