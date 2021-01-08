const Product=require('../models/product')
const category=require('../models/category');
const formidable = require('formidable');
const fs=require("fs");
const _=require('lodash');
console.log("product controller");


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
      // check for all fields
      const { name, description, price, category, quantity } = fields;
  
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity 
      
      )
    
      {
        return res.status(400).json({
          error: "All fields are required",
        });
        
      }
  
      let product = new Product(fields);
     
      // 1kb = 1000
      // 1mb = 1000000
  
      if (files.photo) {
        // console.log("FILES PHOTO: ", files.photo);
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
  
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  };


// exports.createProduct=(req,res)=>{
//     console.log("create product");
//     const ndata=req.body;

//     Product.find().then(data=>{
//     const data2=data.name;
//     console.log(data2);
//     console.log(ndata);
//         const newProduct=new Product(ndata);
//         newProduct.save(ndata).then(ndata=>{
//             res.json({
//                 message:" data saved",
//                 ndata:ndata
//             })
//         }).catch(err=>{
//             res.json({
//                 message:" data saved"+err
//             })
//         })
//         })
        
//     }
    

// exports.createProduct=(req,res)=>{
//     console.log("create product");
//     const data=req.body;
//     console.log(data);
//     Product.find().then(data2=>{
//         console.log(data2);
//         console.log(data.name);
//         if(data.name === data2.name )
//     {
//         res.json({
//             message:"product name already exist"
//         })
//     }
//     else
//     {
//         const newProduct=new Product(data);
//         newProduct.save(data).then(data=>{
//             res.json({
//                 message:" data saved",
//                 data:data
//             })
//         }).catch(err=>{
//             res.json({
//                 message:" data saved"+err
//             })
//         })
//     }
//     });
    
    
// }

exports.getallproduct=(req,res)=>{
    console.log("getallproduct");
    Product.find().then(data=>{
        res.json({
            data:data
        })
    }).catch(err=>{
        message:"error while getting data"+err
    })
}

//const categorytable=category.data._id;
// exports.getProductbyCategory=(req,res)=>{
//     const id=req.params.categoryId;
//     console.log(id);
//             Product.find({},{name:1, category:1}).then(pdata=>{
//                 //console.log(pdata);
//                 const A=pdata[6].category;
//                 console.log(pdata[6].category);
//                 if(A==id)
//                 {
//                 res.json({
//                     data:pdata[6].name
//                     })
//                 }
//                 else{
//                     res.json({
//                         message:"not found"
//                     })
//                 }
//             })
            

//     }

exports.getProductbyCategory=(req,res)=>{
        const id=req.params.categoryId;
        console.log(id);
        Product.find( { "category": id },{photo:0} ).then(data=>{
            res.json({
                data:data
            })
        }).catch(err=>{
            res.json({
                message:"error"+err
            })
        })
}

exports.getProductByName=(req,res)=>{
    const name=req.params.name;
    console.log(name);
    Product.find( { "name": name },{photo:0} ).then(data=>{
        res.json({
            data:data
        })
    }).catch(err=>{
        res.json({
            message:"error"+err
        })
    })
}


exports.deletproduct=(req,res)=>{
    const id=req.params.productId;
    Product.findByIdAndRemove(id).then(()=>{
        res.json({
            message:"deleted"
        })
    }).catch((err)=>{
        res.json({
            message:err
        })   
    })
}


// exports.updateProduct = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Image could not be uploaded",
//         });
//       }
//       // check for all fields
//       const { name, description, price, category, quantity } = fields;
  
//       if (
//         !name ||
//         !description ||
//         !price ||
//         !category ||
//         !quantity 
//       ) {
//         return res.status(400).json({
//           error: "All fields are required",
//         });
//       }
  
//       let product = req.product;
//       product = _.extend(product, fields);
  
//       // 1kb = 1000
//       // 1mb = 1000000
  
//       if (files.photo) {
//         // console.log("FILES PHOTO: ", files.photo);
//         if (files.photo.size > 1000000) {
//           return res.status(400).json({
//             error: "Image should be less than 1mb in size",
//           });
//         }
//         product.photo.data = fs.readFileSync(files.photo.path);
//         product.photo.contentType = files.photo.type;
//       }
  
//       product.save((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err),
//           });
//         }
//         res.json(result);
//       });
//     });
//   };


exports.updateProduct=(req,res)=>{
    const body=req.body;
    const id=req.params.productId;
    Product.findByIdAndUpdate(id, {...body}, {new:true}).then(body=>{
        res.json({
            data:body
        })
        
    }).catch(err=>{
        res.json({
            err
        })
    })
}