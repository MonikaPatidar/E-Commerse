const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.getallcategory=(req,res)=>{
    console.log("getall category");
    Category.find().then((data)=>{
        res.json({
            data:data
        })
    }).catch(()=>{
        res.json({
            message:"error while fetch all category"
        })
    })
}

exports.getcategory=(req,res)=>{
    console.log("get category by ID");
    const id=req.params.categoryid;
    Category.findById(id).then(data=>{
        res.json({
            data:data
        })
    }).catch(err=>{
        message:"error"+err
    })
}


exports.updatecategory=(req,res)=>{
    console.log("update category");
    const id=req.params.categoryid;
    const data=req.body;
    console.log(id);
    Category.findByIdAndUpdate(id,{...data}, {new:true}).then(data=>{
        res.json({
            message:"updated successfully",
            data:data
        })
    }).catch((err)=>{
        res.json({
            message:"error while updating" +err
        })
    })

}

exports.deleteCategory=(req,res)=>{
    console.log("delete controller");
    const id=req.params.categoryid;
    Category.findByIdAndRemove(id).then(()=>{
        res.json({
            message : "Category delete successfully."
        })
            
    }).catch((err)=>{
        res.json({
            message : "error successfully."+err
        })
    })
}
