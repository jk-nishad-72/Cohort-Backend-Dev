const express = require("express");
const postRouter = express.Router();
const {
  postMiddlewares,
} = require("../middlewares/d20prcPostauth.middlewares");
const { postController } = require("../controllers/d20.post.controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", postMiddlewares, upload.single("image"), postController);

module.exports = postRouter;
