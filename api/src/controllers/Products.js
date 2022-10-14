const {Product,Categories} = require('../db')

const plusProduct =async function(req,res){
    let {
    name,
    image,
    price ,
    stock,
    description,
    category
    }= req.body
    console.log(req.body)
    let productCreated =  await Product.create({
        name,
        image,
        price ,
        stock,
        description,
        
    })
    const CategoriesDb= await Categories.findOrCreate({
        where:{name : category}
    })
    console.log(CategoriesDb)
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