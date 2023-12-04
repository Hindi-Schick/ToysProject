const { Toy } = require("../models/toyModel");

exports.createToy = async (req, res, next) => {
    try {
        const body = req.body;
        const newToy = new Toy(body);
        newToy.user_id = req.user.id;
        await newToy.save();
        res.status(201).json(newToy);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getAllToys = async (req, res, next) => {
    try {
        const toys = await Toy.find({});
        res.status(200).json(toys);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getToyById = async (req, res, next) => {
    try {
        const toy = await Toy.findOne({ _id: req.params.id });
        if (!toy) {
            return res.status(404).json({ message: "Toy not found" });
        }
        res.status(200).json(toy);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.editToy = async (req, res, next) => {
    try {
        const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedToy) {
            return res.status(404).json({ message: "Toy not found" });
        }
        res.status(200).json(updatedToy);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteToy = async (req, res, next) => {
    try {
        const deletedToy = await Toy.findByIdAndDelete(req.params.id);
        if (!deletedToy) {
            return res.status(404).json({ message: "Toy not found" });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        next(error);
    }
};
