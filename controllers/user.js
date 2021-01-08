const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.userName=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    User.findById(id ).then(data=>{
        return data
    }).catch(err=>{
        res.json({
            error:err,
        })
    })
}
