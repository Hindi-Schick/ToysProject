const express = require("express");
const { login , register, getById, getAll, editUser, deleteUser } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/",getAll)
router.get("/:id",getById)
router.patch("/:id",auth(),editUser)
router.delete("/:id",auth(),deleteUser)

module.exports = router