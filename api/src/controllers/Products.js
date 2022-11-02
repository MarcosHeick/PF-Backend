const { where } = require('sequelize')
const { Product, Categories, Image, Size } = require('../db')
const cloudinary = require('../utils/cloudinary');

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
        size,
        bestSellers,
    
    } = req.body
    console.log(req.body)
    try {

        let productCreated = await Product.create({
            name,
            price,
            stock,
            description,
            type,
            mainImage,
            bestSellers,
            
        })
        const CategoriesDb = await Categories.findOrCreate({
            where: { name: category }
        })
        //  const a = await Image.findAll()
        console.log(Image)
        if (image.length > 0) {
            for (let i = 0; i < image.length; i++) {

                let a = await Image.findOrCreate({
                    where: { img: image[i] }
                })
                productCreated.addImage(a[0])
            }
        }
        console.log(size)
        if (size.length > 0) {
            for (let i = 0; i < size.length; i++) {

                let a = await Size.findOrCreate({
                    where: { siz3: size[i] }
                })
                
                productCreated.addSize(a[0])
            }
        }

        productCreated.addCategory(CategoriesDb[0])
        // const j = productCreated.id;
        return res.status(200).send(productCreated)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const allProducts = async function () {
    try {
        const resultDb = await Product.findAll({
            include: [{ model: Categories, as: 'categories' },
            { model: Image }, { model: Size }],
        });
        // console.log(await resultDb)

        let a = await Image.findAll({})
        let aMAP = await a?.map(imagen => {
            return { id_product: imagen.id_product, img: imagen.img };
        })

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
                sizes: p.sizes?.map(e => e.siz3),
                categories: p.categories,
                images: p.images.length !== 0 ? p.images.map(i => i.img) : (
                    aMAP.filter(e => {
                        if (e.id_product === p.id) {
                            return e.img;
                        }
                    })).map(sii => sii.img),
                bestSellers: p.bestSellers,

            }
        })

        return respuestDb;

    } catch (error) {
        console.log(error);

    }
}

const getProducts = async function (req, res) {

    try {
        let a = await allProducts()
        res.status(200).send(a)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getProductsId = async function (req, res) {

    const { id } = req.params;
    try {
        let resu = await allProducts()
        let result = resu.filter(ele => ele.id === id)
        res.status(200).send(result)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const getProductsByName = async function (req, res) {
    console.log(req.query);
    const { search } = req.query;
    
    try {
        const resultDbByName = await allProducts();

        let a = search?.toLowerCase();

    const filterDbByName = resultDbByName.filter(prod => prod.name?.toLowerCase().includes(a));

        res.status(200).json(filterDbByName)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}
const putProductById = async function (req, res) {

    //MUY IMPORTANTE AL PASAR IMAGE POR BODY SIEMPRE TIENE QUE SER DIFERENTE!!! 
    const { id_product } = req.params;
    // const { name, price, stock, description, image, mainImage } = req.body;


    // const bringProduct = await Product.findByPk(id, {
    //     include:
    //         { model: Image },
    // });
    // console.log(bringProduct, 'denoche');


    // if (!image[0]) {
    //     return res.status(400).send('El producto debe contener al menos una imagen');
    // }
    // if (!bringProduct) {
    //     return res.status(400).send('No se encontró el Producto :(');
    // }
    try {
        // bringProduct.name = name || bringProduct.name;
        // bringProduct.price = price || bringProduct.price;
        // bringProduct.stock = stock || stock === 0 ? stock : bringProduct.stock;
        // bringProduct.description = description || bringProduct.description;
        // bringProduct.mainImage = mainImage || bringProduct.mainImage;
        // console.log(bringProduct.images[0]);

        // if (image) {
        // const aux=bringProduct.images.map(e=>e.img)
        // console.log(aux,'denoche');

        //     bringProduct.images.map(pic => {
        //         Image.destroy({ where: { img: pic.img } })
        //     });
        //     // await Image.destroy({ where: { productId: bringProduct.id} })
        //     for (let i = 0; i < image.length; i++) {
        //         // console.log(image[i])
        //         let a = await Image.findOrCreate({
        //             where: { img: image[i] }
        //         })
        //         // console.log(a);
        //         bringProduct.addImage(a[0])
        //     }
        // }

        // await bringProduct.save()
        // const savedBringProduct = await bringProduct.reload();
        // return res.status(200).json(savedBringProduct);


        // const { name, price, stock, description, image, mainImage } = req.body;

        const obj = {};
        req.body.name && (obj.name = req.body.name)
        req.body.price && (obj.price = req.body.price)
        req.body.stock && (obj.stock = req.body.stock)
        req.body.description && (obj.description = req.body.description)
        req.body.mainImage && (obj.mainImage = req.body.mainImage)
        // req.body.image && (obj.image = req.body.image)
        req.body.bestSellers && (obj.bestSellers = req.body.bestSellers)
        req.body.value && (obj.value = req.body.value)
        await Product.update(obj, { where: { id: id_product } })
        res.status(200).json(obj)


    } catch (error) {
        return res.status(400).json({ error: error.message })
    }



}


const addImagesByIdProduct = async (req, res) => {
    //   /product/images


    if (!req.files) {
        return res.json('Para continuar seleccione una imagen');
    }

    try {
        let imgUrlArray = [];

        for (let i = 0; i < req.files.length; i++) {
            const cloudinary_image = await cloudinary.uploader.upload(req.files[i].path, {
                folder: 'imagesArray'
            });
            imgUrlArray.push(cloudinary_image.secure_url)
        };

        // console.log(imgUrlArray);
        imgUrlArray.map(img => {
            Image.create({ img })
        });
        // await Image.create({ id_product, img })
        console.log(imgUrlArray);

        res.status(200).json(imgUrlArray)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

    // console.log(traerProductId);
    // console.log(typeof traerProductId);

}

const addImagesByIdProductSingle = async (req, res) => {
    //   /product/images


    if (!req.file) {
        return res.json('Para continuar seleccione una imagen');
    }

    try {


        const cloudinary_image = await cloudinary.uploader.upload(req.file.path, {
            folder: 'imagenes_prueba'
        });



        Image.create({ img: cloudinary_image.secure_url })
        console.log(cloudinary_image.secure_url);
        // let response = buildSuccessMsg([cloudinary_image.secure_url])

        res.status(200).json(cloudinary_image.secure_url)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

    // console.log(traerProductId);
    // console.log(typeof traerProductId);

}




module.exports = { plusProduct, getProducts, getProductsId, getProductsByName, putProductById, addImagesByIdProduct ,addImagesByIdProductSingle}