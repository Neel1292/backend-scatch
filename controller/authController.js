const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if(user) return res.status(401).send("Already have an account, please login.")

        bcrypt.genSalt(12, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    let token = generateToken(user);

                    res.cookie("token", token);
                    res.status(201).send("User created successfully");
                }
            })
        })
        

    } catch (error) {
        console.log(error.message);
    }

}

module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;
    
    let user = await userModel.findOne({ email });
    if(!user) return res.send("Email or Password incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(err) return res.send(err.message);

        if(!result) return res.send("Email or Password incorrect");
        
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
        res.status(200);
    });
}

module.exports.logout = async function(req, res) {
    res.clearCookie("token");
    res.redirect("/");
}