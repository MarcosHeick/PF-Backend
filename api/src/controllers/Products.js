const { where } = require('sequelize')
const { Product, Categories, Image,Size } = require('../db')


const plusProduct = async function (req, res) {
    let {
        name,
        image,
        price,
        stock,
        description,
        category,
        type,
        mainImage,
        size
    } = req.body
    //  console.log(req.body)
    let productCreated = await Product.create({
        name,
        price,
        stock,
        description,
        type,
        mainImage
    })
    const CategoriesDb = await Categories.findOrCreate({
        where: { name: category }
    })
    //  const a = await Image.findAll()
    //  console.log(Image)
    if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
     
            let a = await Image.findOrCreate({
                where: { img: image[i] }
            })
            productCreated.addImage(a[0])
        }
    }
 
    if (size.length > 0) {
        for (let i = 0; i < size.length; i++) {
         
            let a = await Size.findOrCreate({
                where: { siz3: size[i] }
            })
            productCreated.addSize(a[0])
        }
    }

    productCreated.addCategory(CategoriesDb[0])
    return res.send('Product Created!')
}

const allProducts = async function () {
    try {
        const resultDb = await Product.findAll({
            include: [{ model: Categories, as: 'categories' },
            { model: Image }, {model: Size}],
        });
       // console.log(await resultDb)
        let respuestDb = await resultDb?.map(p => {
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                stock: p.stock,
                description: p.description,
                value: p.value,
                type: p.type,
                mainImage: p.mainImage,
                sizes:p.sizes?.map(e=>e.siz3),
                categories: p.categories,
                images: p.images?.map(i => i.img)

            }
        })

        return respuestDb;

    } catch (error) {
        console.log(error);

    }
}

const getProducts = async function (req, res) {
    let a = await allProducts()
    // console.log(a)
    res.status(200).send(a)
}

const getProductsId = async function (req, res) {

    const { id } = req.params;

    let resu = await allProducts()
    let result = resu.filter(ele => ele.id === id)
    res.status(200).send(result)
}


const getProductsByName = async function (req, res) {
    // console.log(req.query);
    const { search } = req.query;

    const resultDbByName = await allProducts();

    let a = search.toLowerCase();

    const filterDbByName = resultDbByName.filter(prod => prod.name.toLowerCase().includes(a));

    res.status(200).json(filterDbByName)

}
const putProductById = async function (req, res) {

    //MUY IMPORTANTE AL PASAR IMAGE POR BODY SIEMPRE TIENE QUE SER DIFERENTE!!! 
    const { id } = req.params;
    const { name, price, stock, description, image, mainImage } = req.body;


    const bringProduct = await Product.findByPk(id, {
        include:
            { model: Image },
    });
    console.log(bringProduct, 'denoche');


    if (!image[0]) {
        return res.status(400).send('El producto debe contener al menos una imagen');
    }
    if (!bringProduct) {
        return res.status(400).send('No se encontró el Producto :(');
    }
    try {
        bringProduct.name = name || bringProduct.name;
        bringProduct.price = price || bringProduct.price;
        bringProduct.stock = stock || stock === 0 ? stock : bringProduct.stock;
        bringProduct.description = description || bringProduct.description;
        bringProduct.mainImage = mainImage || bringProduct.mainImage;
        // console.log(bringProduct.images[0]);

        if (image) {
            // const aux=bringProduct.images.map(e=>e.img)
            // console.log(aux,'denoche');

            bringProduct.images.map(pic => {
                Image.destroy({ where: { img: pic.img } })
            });
            // await Image.destroy({ where: { productId: bringProduct.id} })
            for (let i = 0; i < image.length; i++) {
                // console.log(image[i])
                let a = await Image.findOrCreate({
                    where: { img: image[i] }
                })
                // console.log(a);
                bringProduct.addImage(a[0])
            }
        }

        await bringProduct.save()
        const savedBringProduct = await bringProduct.reload();
        return res.status(200).json(savedBringProduct);




    } catch (error) {
        return res.status(400).json({ error: error.message })
    }



}



module.exports = { plusProduct, getProducts, getProductsId, getProductsByName,putProductById }