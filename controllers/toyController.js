const { Toy } = require("../models/toyModel");
const Joi = require("joi");

const perPage = 10;

const toyJoiSchema = {
    toyObj: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        category: Joi.string(),
        price: Joi.number(),
        img_url: Joi.string(),
        date_created: Joi.date()
    })
}


/*exports.createToy = async (req, res, next) => {
    try {
        const body = req.body;
        const newToy = new Toy(body);
        if (req.user && req.user._id) {
            newToy.user_id = req.user._id;
        } else {
            // אם יש מצב שאין משתמש מופעל או שאין לו _id, יש לטפל במקרה הזה
            // אפשר להשאיר אותו לבד כמו שהוא או להתנהג בהתאם לצורך העסקי
        }
        await newToy.save();
        res.status(201).json(newToy);
    } catch (error) {
        console.error(error);
        next(error);
    }
};*/
/*exports.createToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.user_id;
    try {
        const valid = toyJoiSchema.toyObj.validate(body);
        if (valid.error) {
            throw Error(valid.error);
        }

        const newToy = new Toy(body);
        // add extra things
        //newToy.id = newToy._id;

        //save the parent referncing to the current loded in user 
        newToy.owner_id = userId;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};*/
exports.createToy = async (req, res, next) => {
    try {
        const body = req.body;
        const userId = res.locals._id; // השינוי כאן ל־_id
        console.log("user_id:", res.locals._id); // השינוי כאן ל־_id

        // Check if userId is defined
        if (!userId) {
            return res.sendStatus(401); // Unauthorized
        }

        const valid = toyJoiSchema.toyObj.validate(body);
        if (valid.error) {
            throw new Error(valid.error.message);
        }

        const newToy = new Toy(body);
        newToy.owner_id = userId;
        await newToy.save();

        res.status(201).send(newToy);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};

exports.getAllToys = async (req, res, next) => {
    try {
        const { page } = req.query;
        const perPage = 10;

        const skipPages = (page - 1) * perPage;
        const toys = await Toy.find({}).skip(skipPages).limit(perPage);

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
