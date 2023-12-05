const express = require("express");
const { createToy, getAllToys, getToyById, editToy, deleteToy } = require("../controllers/toyController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth("USER"), createToy);
router.get("/", getAllToys);
router.get("/:id", getToyById);
router.patch("/:id", auth("USER"), editToy);
router.delete("/:id", auth("USER"), deleteToy);

module.exports = router;
