const products = require('../models/products');
const fs =require('fs');

exports.addProducts = (async(req,res)=>{
    const path = req.file !=undefined? req.file.path : null; 

    await products.create(({
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        type:req.body.type,
        image:path
    })).then(()=>{
        return res.status(200).json({message:"Product added"});
    }).catch(err => {
        console.log("Error in Adding a new products", err);
        return res.status(500).json(err);
    });

} );

exports.editProducts = (async (req,res)=>{
    await products.findOne({where: {id: req.params.id} }).then(productData => {
        const updateName = req.body.name != undefined ? req.body.name : productData.name;
        const p_desc = req.body.description != undefined ? req.body.description : productData.description;
        const p_price = req.body.price != undefined ? req.body.price : productData.price;
        const p_type = req.body.type != undefined ? req.body.type : productData.type;
        const path = req.file !=undefined? req.file.path : productData.path; 
        
        const value ={
            name: updateName,
            description: p_desc,
            price: parseFloat(p_price),
            type: p_type,
            image:path
        };
        const condition = {where:{id:req.params.id}};
         products.update(value,condition).then(()=>{
                return res.status(200).json({message:"Product updated"});
            }).catch(err => {
                console.log("Error in Updating a new products", err);
                return res.status(500).json(err);
            });
    })
} );


exports.getAllProducts = (async (req,res)=>{
    const setOffset = req.body.offset != undefined?parseInt(req.body.offset): 0;
    const setLimit = req.body.limit != undefined?parseInt(req.body.limit): 2;
    const searchName = req.body.name != undefined?{name:req.body.name}:{};


    await products.findAndCountAll({where:{},offset:setOffset,limit:setLimit}).then(productData => {
                return res.status(200).json({
                    message:"Product List",
                    prd :productData
                });
            }).catch(err => {
                console.log("Error in Updating a new products", err);
                return res.status(500).json(err);
            });
});


exports.getSpecificProducts = (async (req,res)=>{
    await products.findOne({where:{id:req.params.id}}).then(productData => {
                return res.status(200).json({
                    message:"Product List",
                    prd :productData
                });
            }).catch(err => {
                console.log("No Product Found", err);
                return res.status(500).json(err);
            });
});


exports.deleteProductById = (async(req,res)=>{
    await products.findOne({where:{id:req.params.id}}).then(productData => {
        if (productData) {
            fs.unlinkSync(productData.image);
            products.destroy({ where: { id: req.params.id } }).then(()=>{
                return res.status(200).send('Deleted Successfully');
            }).catch((error) => {
                return res.status(400).send(error);
            });
        }else{
            console.log('Error deleting the product', error);
            return res.status(404).json({message:'Error deleting the product'})
        }
    }).catch(err => {
        console.log("No Product Found", err);
        return res.status(500).json(err);
    });
});
