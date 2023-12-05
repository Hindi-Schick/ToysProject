exports.auth = (role) => {
    return async function (req, res, next) {
        const token = req.headers["x-api-key"];
        console.log("Token:", token);
        if (!token) return res.json({ msg: "header not contain token" });
        //token= token.split(" ")[1];
        try {
            const payload = decodeToken(token);
            console.log("Payload:", payload);
            //save the token user id in locals
            res.locals.userId = payload._doc.id;
            console.log("User ID:", payload._doc.id);

            // נוסיף בדיקה לפי ה-Role
            if (role && payload._doc.role !== role) {
                return res.json({ msg: "User does not have the required role" });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
