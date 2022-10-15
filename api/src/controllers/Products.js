    const { where } = require('sequelize')
const {Product,Categories,Image} = require('../db')

    const plusProduct =async function(req,res){
        let {
        name,
        image,
        price ,
        stock,
        description,
        category
        }= req.body
      //  console.log(req.body)
        let productCreated =  await Product.create({
            name,
            // img,
            price ,
            stock,
            description,
            
        })
        const CategoriesDb= await Categories.findOrCreate({
            where:{name : category}
        })
        //  const a = await Image.findAll()
        //  console.log(Image)
        if (image.length>0){
            for(let i =0; i<image.length;i++){
             console.log(image[i])
           let a=  await Image.findOrCreate({
                where :{img: image[i]}
             })
        productCreated.addImage(a[0])
    }
    }
        
     
        productCreated.addCategory(CategoriesDb[0])
        return res.send ('Product Created!')
    }

    const allProducts= async function (){
        return await Product.findAll({
            include:{
                model:Categories,
                attributes:['name'],
                trough:{
                    attributes: [],
                },
            },
            include:{
                model: Image,
                attributes: ['img'],
                through:{
                    attributes:[],
                }
            }
        })
    }

    const getProducts= async function(req,res){
        let a = await allProducts()
        console.log(a)
        res.status(200).send(a)
    }

    const getProductsId = async function(req, res){
        
        const { id } = req.params;
        
        let resu = await allProducts()
        let result = resu.filter( ele => ele.id === id)
        res.status(200).send(result)
    }

    module.exports = {plusProduct,getProducts, getProductsId}