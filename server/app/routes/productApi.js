const express = require("express");
const router = express.Router();
const productApiController = require("../controller/productApiController");
const upload = require("../helpers/multer");


router.post("/create-product", upload.single("image"), productApiController.createProduct);
router.get("/products", productApiController.getAllProducts);
router.get("/products/:id", productApiController.getProduct);
router.put("/products/:id", upload.single("image"), productApiController.updateProduct);
router.delete("/products/:id", productApiController.deleteProduct);

module.exports = router;
