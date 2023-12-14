var express = require("express");
var router = express.Router();

const userApiController = require('../../controllers/api/user.api.controller')
const { auth, apiAuth } = require('../../middleware/auth')
const { upload } = require("../../middleware/upload")

router.post("/register", userApiController.register);
router.post("/login", userApiController.login);
router.post("/update",upload.single('image'), userApiController.updateUser);
router.get("/token", apiAuth, userApiController.getByToken);

router.get("/", auth , userApiController.getAll);
router.get("/:id", userApiController.getById);
module.exports = router;