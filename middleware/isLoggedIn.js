const jwt = require("jsonwebtoken");
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    if(!req.cookies.token) {
        req.flash("error", "Please Login and try again!");
        return res.redirect("/");
    }

    try {
        let decode = jwt.verify(req.cookie.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({email: decode.email})
            .select("-password");

        req.user = user;

        next();
    } catch (error) {
        req.flash("error","Something went wrong!");
        res.redirect("/");
    }
}