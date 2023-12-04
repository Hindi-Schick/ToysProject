const express = require("express");
const { createToy, getAllToys, getToyById, editToy, deleteToy } = require("../controllers/toyController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/createToy", auth("USER"), createToy);
router.get("/getAllToys", auth(), getAllToys);
router.get("/getToyById", auth(), getToyById);
router.patch("/editToy", auth("USER"), editToy);
router.delete("/deleteToy", auth("USER"), deleteToy);

module.exports = router;
