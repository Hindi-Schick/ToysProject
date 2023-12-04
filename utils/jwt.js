const jwt = require("jsonwebtoken");

// הצפנת טוקן

exports.generateToken = (payload) => {
    try {
        const token = jwt.sign({ ...payload }, '123@@', { expiresIn: '2h' });
        return token;
    } catch (error) {
        console.log(error.message);

        throw Error(error.message);
    }
}
// הורדת הצפנה מהטוקן
exports.decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, '123@@');
        return payload; 
    } catch (error) {
        console.log(error.message);
        throw Error(error.message);
    }
}